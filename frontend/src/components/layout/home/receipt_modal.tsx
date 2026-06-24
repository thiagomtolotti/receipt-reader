import { forwardRef } from 'react'

import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'

import { Pen } from 'lucide-react'

import ReceiptForm from './receipt_form'

import useSaveReceipt from './hooks/useSaveReceipt'

import type {
  CreateReceiptDTO,
  CreateReceiptItemDTO,
  Receipt,
} from './types/receipt'

type ReceiptModalBaseProps = {
  receipt: Receipt
  open?: boolean
  setOpen?: (open: boolean) => void
  isEnabled?: boolean
}

interface UncontrolledReceiptModalProps {
  open?: undefined
  setOpen?: undefined
}

interface ControlledReceiptModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

type ReceiptModalProps = ReceiptModalBaseProps &
  (UncontrolledReceiptModalProps | ControlledReceiptModalProps)

export default function ReceiptModal({
  receipt,
  open,
  setOpen,
  isEnabled = true,
}: ReceiptModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open === undefined && <ReceiptModal.Trigger />}

      <ReceiptModal.Content receipt={receipt} isEnabled={isEnabled} />
    </Dialog>
  )
}

ReceiptModal.Trigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ children, ...props }, ref) => {
  return (
    <DialogTrigger>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" ref={ref} {...props}>
            <Pen />
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit receipt</TooltipContent>
      </Tooltip>
    </DialogTrigger>
  )
})

interface ReceiptModalContentProps {
  receipt: Receipt
  isEnabled?: boolean
}

ReceiptModal.Content = ({ receipt, isEnabled }: ReceiptModalContentProps) => {
  const { mutateAsync, isPending } = useSaveReceipt(receipt.id)

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

    const data: CreateReceiptDTO = {
      date: formData.get('date') as string,
      store_name: formData.get('store_name') as string,
      total: Math.round(parseFloat(formData.get('total') as string) * 100),
      items: itemsArray,
    }

    await mutateAsync(data)
  }

  return (
    <DialogContent className="max-w-lg!">
      <DialogHeader className="mb-4">
        <DialogTitle>
          <h2 className="font-bold text-xl">Receipt</h2>
        </DialogTitle>
      </DialogHeader>

      <ReceiptForm
        receipt={receipt}
        isEnabled={isEnabled}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </DialogContent>
  )
}
