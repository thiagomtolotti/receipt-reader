import { Button } from '#/components/ui/button'
import { DialogClose } from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import type { HTMLProps } from 'react'
import { cn } from '#/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import type { Receipt, ReceiptItem } from './types/receipt'
import MoneyInput from '#/components/ui/money_input'

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
          <Input
            defaultValue={receipt.store_name}
            disabled={!isEnabled}
            name="store_name"
          />
        </Field>

        <Field className="w-1/2">
          <FieldLabel>Date</FieldLabel>
          <Input
            type="date"
            defaultValue={receipt.date.toISOString().split('T')[0]}
            disabled={!isEnabled}
            name="date"
          />
        </Field>
      </div>

      <ReceiptForm.ItemsList items={receipt.items} isEnabled={isEnabled} />

      <MoneyInput
        name="total"
        defaultValue={receipt.total}
        isEnabled={isEnabled}
      />

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
              <Input
                defaultValue={item.name}
                name={`items[${index}].name`}
                disabled={!isEnabled}
              />
            </TableCell>
            <TableCell className="w-32">
              <MoneyInput
                defaultValue={item.price}
                name={`items[${index}].price`}
                disabled={!isEnabled}
                showLabel={false}
                className="w-auto"
              />
            </TableCell>
            <TableCell className="w-0">
              <Input
                type="number"
                defaultValue={item.quantity}
                name={`items[${index}].quantity`}
                disabled={!isEnabled}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
