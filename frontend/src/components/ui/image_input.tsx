import React, { useEffect, useState } from 'react'
import { Label } from './label'
import { Input } from './input'
import { UploadCloud, Trash2 } from 'lucide-react'
import { Button } from './button'

type ImageInputProps = {
  file?: File | null
  onChange?: (file: File | null) => void
}

export default function ImageInput({ file, onChange }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] ?? null
    onChange?.(selectedFile)
  }

  function clear() {
    setPreview(null)
    onChange?.(null)
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    onChange?.(droppedFile)
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragging(true)
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  return (
    <div className="w-full">
      <Label className="block">
        <Input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="sr-only"
        />

        <div
          className={`relative flex items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-md bg-background overflow-hidden ${
            isDragging ? 'opacity-80 border-primary' : ''
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          {!preview ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadCloud size={36} />
              <div className="text-sm">Click to upload an image</div>
            </div>
          ) : (
            <>
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-full"
              />
              <Button
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  clear()
                }}
                className="absolute top-2 right-2 bg-background/80 rounded-full p-1 text-foreground hover:bg-background"
                aria-label="Remove image"
              >
                <Trash2 />
              </Button>
            </>
          )}
        </div>
      </Label>
    </div>
  )
}
