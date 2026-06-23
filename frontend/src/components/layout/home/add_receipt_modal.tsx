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
import type { CreateReceiptDTO, Receipt } from './types/receipt'
import ReceiptForm from './receipt_form'
import useSaveReceipt from './hooks/useSaveReceipt'

export default function AddReceiptModal() {
  const [step, setStep] = useState<'form' | 'confirmation'>('form')
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <Button>Create new</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg!">
        <DialogHeader className="mb-4">
          <DialogTitle>
            <h2 className="font-bold text-xl">Add Receipt</h2>
          </DialogTitle>

          <DialogDescription>
            Upload your receipt image and we will process it for you.
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <AddReceiptModal.UploadImageStep
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

interface UploadImageStepProps {
  onSuccess: (receipt: Receipt) => void
}

AddReceiptModal.UploadImageStep = ({ onSuccess }: UploadImageStepProps) => {
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
  const { mutateAsync } = useSaveReceipt()

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const data = new FormData(ev.currentTarget)

    const receiptData: CreateReceiptDTO = {
      date: data.get('date') as string,
      store_name: data.get('store_name') as string,
      total: parseFloat((data.get('total') as string).replace('R$', '').trim()),
      items: [],
    }

    await mutateAsync(receiptData)
  }

  return <ReceiptForm receipt={receipt} onSubmit={handleSubmit} />
}
