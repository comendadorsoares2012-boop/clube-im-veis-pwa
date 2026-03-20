import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Camera, X, GripVertical, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export interface PhotoItem {
  id: string;
  file: File;
  preview: string;
}

interface PhotoUploadProps {
  photos: PhotoItem[];
  onChange: (photos: PhotoItem[]) => void;
  max?: number;
}

const PhotoUpload = ({ photos, onChange, max = 10 }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const remaining = max - photos.length;
      if (remaining <= 0) {
        toast.error(`Máximo de ${max} fotos permitidas.`);
        return;
      }
      if (arr.length > remaining) {
        toast.warning(`Apenas ${remaining} foto(s) adicionada(s). Limite de ${max}.`);
      }
      const newPhotos: PhotoItem[] = arr.slice(0, remaining).map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
      onChange([...photos, ...newPhotos]);
    },
    [photos, onChange, max]
  );

  const removePhoto = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.preview);
    onChange(photos.filter((p) => p.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag-and-drop zone handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Fotos ({photos.length}/{max})
        </Label>
        {photos.length > 1 && (
          <span className="text-[10px] text-muted-foreground">
            Arraste para reordenar
          </span>
        )}
      </div>

      {/* Drop zone when empty */}
      {photos.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-12 transition-all ${
            isDraggingOver
              ? "border-primary bg-primary/5 text-primary"
              : "border-input text-muted-foreground hover:border-primary/40 hover:text-primary"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <ImagePlus className="h-7 w-7" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">Arraste fotos aqui</p>
            <p className="mt-0.5 text-xs">ou clique para selecionar</p>
          </div>
        </div>
      )}

      {/* Reorderable grid */}
      {photos.length > 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-2xl transition-all ${
            isDraggingOver ? "ring-2 ring-primary ring-offset-2" : ""
          }`}
        >
          <Reorder.Group
            axis="x"
            values={photos}
            onReorder={onChange}
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5"
          >
            <AnimatePresence mode="popLayout">
              {photos.map((photo, i) => (
                <Reorder.Item
                  key={photo.id}
                  value={photo}
                  whileDrag={{ scale: 1.06, zIndex: 50, boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-input active:cursor-grabbing"
                >
                  <img
                    src={photo.preview}
                    alt={`Foto ${i + 1}`}
                    className="pointer-events-none h-full w-full object-cover"
                    draggable={false}
                  />

                  {/* Cover badge */}
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded-md bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground">
                      Capa
                    </span>
                  )}

                  {/* Grip icon */}
                  <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-md bg-foreground/50 text-background opacity-0 transition-opacity group-hover:opacity-100">
                    <GripVertical className="h-3 w-3" />
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(photo.id);
                    }}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-background opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Reorder.Item>
              ))}
            </AnimatePresence>

            {/* Add more button */}
            {photos.length < max && (
              <motion.button
                layout
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-input text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Camera className="h-5 w-5" />
                <span className="text-[10px] font-medium">Adicionar</span>
              </motion.button>
            )}
          </Reorder.Group>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PhotoUpload;
