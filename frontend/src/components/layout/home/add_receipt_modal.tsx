import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'

import { useState } from 'react'

export default function AddReceiptModal() {
  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <Button>Create new</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Receipt</DialogTitle>
          <DialogDescription>
            Upload your receipt image, we will process it for you.
          </DialogDescription>
        </DialogHeader>

        <AddReceiptModal.Form />
      </DialogContent>
    </Dialog>
  )
}

AddReceiptModal.Form = () => {
  const [file, setFile] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept="image/*"
      />

      <div className="mt-8 ml-auto flex gap-4">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>

        <Button disabled={!file}>Continue</Button>
      </div>
    </form>
  )
}
