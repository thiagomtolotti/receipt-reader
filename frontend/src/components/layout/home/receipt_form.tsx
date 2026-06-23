import { Button } from '#/components/ui/button'
import { DialogClose } from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import type { HTMLProps } from 'react'
import type { Receipt, ReceiptItem } from './hooks/useListReceipts'
import { cn } from '#/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

interface ReceiptFormProps extends Partial<HTMLProps<HTMLFormElement>> {
  receipt: Receipt
  isEnabled?: boolean
}

export default function ReceiptForm({
  receipt,
  className,
  isEnabled = true,
  ...props
}: ReceiptFormProps) {
  return (
    <form className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex gap-2">
        <Field className="w-full">
          <FieldLabel>Store name</FieldLabel>
          <Input defaultValue={receipt.store_name} disabled={!isEnabled} />
        </Field>

        <Field className="w-1/2">
          <FieldLabel>Date</FieldLabel>
          <Input
            type="date"
            defaultValue={receipt.date.toISOString().split('T')[0]}
            disabled={!isEnabled}
          />
        </Field>
      </div>

      <ReceiptForm.ItemsList items={receipt.items} isEnabled={isEnabled} />

      <Field className="w-40 ml-auto">
        <FieldLabel className="ml-auto!">Total</FieldLabel>
        <Input
          defaultValue={receipt.total}
          className="text-right"
          disabled={!isEnabled}
        />
      </Field>

      <div className="flex gap-4 ml-auto mt-8">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>

        {isEnabled && <Button>Submit</Button>}
      </div>
    </form>
  )
}

interface ReceiptModalItemsListProps {
  items: ReceiptItem[]
  isEnabled?: boolean
}

ReceiptForm.ItemsList = ({
  items,
  isEnabled = true,
}: ReceiptModalItemsListProps) => {
  return (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Input defaultValue={item.name} disabled={!isEnabled} />
            </TableCell>
            <TableCell className="w-32">
              <Input defaultValue={item.price} disabled={!isEnabled} />
            </TableCell>
            <TableCell className="w-0">
              <Input
                type="number"
                defaultValue={item.quantity}
                disabled={!isEnabled}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
