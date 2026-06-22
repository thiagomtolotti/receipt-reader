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
import useUploadReceiptImage from './hooks/useUploadReceiptImage'
import ReceiptModal from './receipt_modal'
import type { Receipt } from './hooks/useListReceipts'

export default function AddReceiptModal() {
  const [step, setStep] = useState<'form' | 'confirmation'>('form')
  const [receipt, setReceipt] = useState<Receipt | null>(null)

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

        {step === 'form' && (
          <AddReceiptModal.Form
            onSuccess={(r) => {
              setReceipt(r)
              setStep('confirmation')
            }}
          />
        )}
        {step === 'confirmation' && (
          <AddReceiptModal.ConfirmationStep receipt={receipt!} />
        )}
      </DialogContent>
    </Dialog>
  )
}

interface FormProps {
  onSuccess: (receipt: Receipt) => void
}

AddReceiptModal.Form = ({ onSuccess }: FormProps) => {
  const { mutateAsync } = useUploadReceiptImage()
  const [file, setFile] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!file) throw new Error('No file selected')

    const receipt = await mutateAsync(file)

    onSuccess(receipt)
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

interface ConfirmationStepProps {
  receipt: Receipt
}

AddReceiptModal.ConfirmationStep = ({ receipt }: ConfirmationStepProps) => {
  return <ReceiptModal.Content receipt={receipt} />
}
