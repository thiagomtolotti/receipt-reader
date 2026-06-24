import { Button } from '#/components/ui/button'
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
import type {
  CreateReceiptDTO,
  CreateReceiptItemDTO,
  Receipt,
} from './types/receipt'
import ReceiptForm from './receipt_form'
import useSaveReceipt from './hooks/useSaveReceipt'
import ImageInput from '#/components/ui/image_input'

export default function AddReceiptModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'confirmation'>('form')
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <AddReceiptModal.ConfirmationStep
            receipt={receipt!}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

interface UploadImageStepProps {
  onSuccess: (receipt: Receipt) => void
}

AddReceiptModal.UploadImageStep = ({ onSuccess }: UploadImageStepProps) => {
  const { mutateAsync, isPending } = useUploadReceiptImage()
  const [file, setFile] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!file) throw new Error('No file selected')

    const receipt = await mutateAsync(file)

    onSuccess(receipt)
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <ImageInput file={file} onChange={(file) => setFile(file)} />

      <div className="mt-8 ml-auto flex gap-4">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>

        <Button disabled={!file} loading={isPending}>
          Continue
        </Button>
      </div>
    </form>
  )
}

interface ConfirmationStepProps {
  receipt: Receipt
  onClose?: () => void
}

AddReceiptModal.ConfirmationStep = ({
  receipt,
  onClose,
}: ConfirmationStepProps) => {
  const { mutateAsync, isPending } = useSaveReceipt()

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)

    const itemsMap: Record<string, Partial<CreateReceiptItemDTO>> = {}

    for (const [key, value] of formData.entries()) {
      // Match keys like items[Apple].name
      const match = key.match(/^items\[([^\]]+)\]\.(\w+)$/)
      if (match) {
        const [_, itemKey, field] = match

        if (!itemsMap[itemKey]) {
          itemsMap[itemKey] = {
            name: '',
            price: 0,
            quantity: 0,
          }
        }

        itemsMap[itemKey] = {
          name: field === 'name' ? (value as string) : itemsMap[itemKey].name,
          price:
            field === 'price'
              ? Math.round(parseFloat(value as string) * 100)
              : itemsMap[itemKey].price,
          quantity:
            field === 'quantity'
              ? parseInt(value as string, 10)
              : itemsMap[itemKey].quantity,
        }
      }
    }

    const itemsArray = Object.values(itemsMap) as CreateReceiptItemDTO[]

    const receiptData: CreateReceiptDTO = {
      date: formData.get('date') as string,
      store_name: formData.get('store_name') as string,
      total: Math.round(parseFloat(formData.get('total') as string) * 100),
      items: itemsArray,
    }

    await mutateAsync(receiptData)

    if (onClose) onClose()
  }

  return (
    <ReceiptForm
      receipt={receipt}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  )
}
