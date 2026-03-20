---
description: Deploy completo — commit no GitHub + deploy no Railway
---

// turbo-all

## Processo de Deploy Unificado

Quando o usuário pedir "commit", "push", "deploy" ou "atualizar", execute este workflow completo:

### Pré-requisitos
Antes de qualquer passo, verifique se git e railway CLI estão disponíveis:
```
cmd /c "git --version 2>&1"
cmd /c "railway --version 2>&1"
```
Se algum não estiver instalado, informe o usuário segundo o guia de instalação.

### 1. Build de produção
// turbo
Execute o build para garantir que o código compila sem erros:
```powershell
npm run build
```
Se o build falhar, pare aqui e informe o erro.

### 2. Git — Add, Commit e Push
// turbo
Adicione todos os arquivos, faça commit com a mensagem fornecida pelo usuário e envie para o GitHub:
```powershell
git add -A
git status --short
git commit -m "mensagem fornecida pelo usuario ou timestamp automatico"
git push origin main
```

### 3. Deploy no Railway
// turbo
Após o push no GitHub, dispare o deploy no Railway:
```powershell
railway up --detach
```

### 4. Verificar status
// turbo
Aguarde alguns segundos e verifique o status:
```powershell
railway status
```

### Comando alternativo (tudo de uma vez)
```powershell
.\deploy.ps1 "sua mensagem de commit aqui"
```
