# ============================================================
#  deploy.ps1 — Script de Deploy Unificado
#  Clube Aqui Tem Imóveis — Railway + GitHub
#  Uso: .\deploy.ps1 "mensagem do commit"
# ============================================================

param(
    [string]$Mensagem = "chore: atualizacao automatica $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot

# ------ Cores -------------------------------------------------
function Green($t)  { Write-Host $t -ForegroundColor Green }
function Yellow($t) { Write-Host $t -ForegroundColor Yellow }
function Red($t)    { Write-Host $t -ForegroundColor Red }
function Cyan($t)   { Write-Host $t -ForegroundColor Cyan }

Cyan "=============================================="
Cyan "  DEPLOY UNIFICADO — Clube Aqui Tem Imoveis"
Cyan "=============================================="
Write-Host ""

# ------ 1. Verificar dependencias ----------------------------
Yellow "[1/7] Verificando dependencias instaladas..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Red "ERRO: Git nao encontrado. Instale em: https://git-scm.com/download/win"
    exit 1
}
Green "  ✓ Git OK"

if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Red "ERRO: Railway CLI nao encontrado."
    Yellow "  Execute: npm install -g @railway/cli"
    Yellow "  Depois: railway login"
    exit 1
}
Green "  ✓ Railway CLI OK"

# ------ 2. Inicializar Git se necessario ---------------------
Yellow "[2/7] Verificando repositorio Git..."

if (-not (Test-Path (Join-Path $ProjectDir ".git"))) {
    Yellow "  Repositorio nao encontrado. Inicializando..."
    git init
    git branch -M main
    Green "  ✓ Git inicializado"
} else {
    Green "  ✓ Repositorio Git encontrado"
}

# Verificar remote origin
$remoteExists = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Yellow "  AVISO: Remote 'origin' nao configurado."
    Yellow "  Para adicionar: git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git"
    $skipGitHub = $true
} else {
    Green "  ✓ Remote origin: $remoteExists"
    $skipGitHub = $false
}

# ------ 3. Verificar conexao Supabase ------------------------
Yellow "[3/7] Verificando conexao com Supabase..."

$envFile = Join-Path $ProjectDir ".env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile -Raw
    if ($envContent -match 'VITE_SUPABASE_URL="([^"]+)"') {
        $supabaseUrl = $Matches[1]
        Green "  ✓ Supabase URL: $supabaseUrl"
    }
    if ($envContent -match 'VITE_SUPABASE_PUBLISHABLE_KEY="([^"]{20})') {
        Green "  ✓ Supabase Anon Key configurada"
    }
} else {
    Red "  ERRO: arquivo .env nao encontrado!"
    exit 1
}

# Testar conexao HTTP com Supabase
try {
    $response = Invoke-WebRequest -Uri "$supabaseUrl/rest/v1/" -Method HEAD -TimeoutSec 5 -ErrorAction Stop
    Green "  ✓ Supabase respondendo (status: $($response.StatusCode))"
} catch {
    Yellow "  AVISO: Nao foi possivel verificar Supabase (pode ser CORS, normal em local)"
}

# ------ 4. Build do projeto ----------------------------------
Yellow "[4/7] Gerando build de producao..."

Set-Location $ProjectDir
npm run build

if ($LASTEXITCODE -ne 0) {
    Red "ERRO: Build falhou! Corrija os erros antes de fazer deploy."
    exit 1
}
Green "  ✓ Build concluido com sucesso"

# ------ 5. Git — Stage, Commit e Push -----------------------
if (-not $skipGitHub) {
    Yellow "[5/7] Atualizando repositorio GitHub..."

    git add -A
    
    $statusOutput = git status --porcelain
    if ($statusOutput) {
        git commit -m $Mensagem
        Green "  ✓ Commit: '$Mensagem'"
        
        git push origin main 2>&1
        if ($LASTEXITCODE -ne 0) {
            Yellow "  Tentando push com upstream..."
            git push --set-upstream origin main
        }
        Green "  ✓ Push para GitHub concluido"
    } else {
        Green "  ✓ Nenhuma mudanca para commitar (working tree limpo)"
    }
} else {
    Yellow "[5/7] GitHub pulado (sem remote configurado)"
}

# ------ 6. Deploy Railway ------------------------------------
Yellow "[6/7] Iniciando deploy no Railway..."

railway up --detach

if ($LASTEXITCODE -ne 0) {
    Red "ERRO: Deploy Railway falhou!"
    Yellow "  Verifique: railway status"
    exit 1
}
Green "  ✓ Deploy Railway enviado"

# ------ 7. Status final --------------------------------------
Yellow "[7/7] Verificando status do deploy..."

Start-Sleep -Seconds 3
railway status

Write-Host ""
Cyan "=============================================="
Green "  DEPLOY CONCLUIDO COM SUCESSO!"
Cyan "=============================================="
Write-Host ""
Yellow "  Proximos passos uteis:"
Write-Host "  • railway logs       — ver logs em tempo real"
Write-Host "  • railway open       — abrir projeto no navegador"
Write-Host "  • railway status     — verificar status do servico"
Write-Host ""
