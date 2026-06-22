import { Button } from '#/components/ui/button'
import { DialogClose } from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import type { HTMLProps } from 'react'
import type { Receipt } from './hooks/useListReceipts'
import ReceiptModal from './receipt_modal'
import { cn } from '#/lib/utils'

interface ReceiptFormProps extends Partial<HTMLProps<HTMLFormElement>> {
  receipt: Receipt
}

export default function ReceiptForm({
  receipt,
  className,
  ...props
}: ReceiptFormProps) {
  return (
    <form className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex gap-2">
        <Field className="w-full">
          <FieldLabel>Store name</FieldLabel>
          <Input defaultValue={receipt.store_name} />
        </Field>

        <Field className="w-1/2">
          <FieldLabel>Date</FieldLabel>
          <Input
            type="date"
            defaultValue={receipt.date.toISOString().split('T')[0]}
          />
        </Field>
      </div>

      <ReceiptModal.ItemsList items={receipt.items} />

      <Field className="w-40 ml-auto">
        <FieldLabel className="ml-auto!">Total</FieldLabel>
        <Input defaultValue={receipt.total} className="text-right" />
      </Field>

      <div className="flex gap-4 ml-auto mt-8">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>

        <Button>Submit</Button>
      </div>
    </form>
  )
}
