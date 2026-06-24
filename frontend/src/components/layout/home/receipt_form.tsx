import { Button } from '#/components/ui/button'
import { DialogClose } from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import type { HTMLProps } from 'react'
import type { Receipt, ReceiptItem } from './types/receipt'

import MoneyInput from '#/components/ui/money_input'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '#/components/ui/empty'
import { Plus, Trash2 } from 'lucide-react'

interface ReceiptFormProps extends Partial<HTMLProps<HTMLFormElement>> {
  receipt: Receipt
  isEnabled?: boolean
  isPending?: boolean
}

export default function ReceiptForm({
  receipt,
  className,
  isEnabled = true,
  isPending = false,
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

        {isEnabled && <Button loading={isPending}>Submit</Button>}
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <ReceiptForm.ItemRow
            key={item.id}
            item={item}
            isEnabled={isEnabled}
          />
        ))}

        {items.length === 0 && <ReceiptForm.EmptyItems />}

        {isEnabled && <ReceiptForm.AddItemButton />}
      </TableBody>
    </Table>
  )
}

ReceiptForm.EmptyItems = () => {
  return (
    <TableRow className="hover:bg-transparent!">
      <TableCell colSpan={9999}>
        <Empty className="py-4">
          <EmptyHeader className="gap-1">
            <EmptyTitle className="text-xs">No receipts found</EmptyTitle>
            <EmptyDescription className="text-xs">
              Try adding some receipts to see them here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  )
}

interface ReceiptFormItemRowProps {
  item: ReceiptItem
  isEnabled?: boolean
}

ReceiptForm.ItemRow = ({ item, isEnabled = true }: ReceiptFormItemRowProps) => {
  return (
    <TableRow key={item.id}>
      <TableCell>
        <Input
          defaultValue={item.name}
          name={`items[${item.id}].name`}
          disabled={!isEnabled}
        />
      </TableCell>

      <TableCell className="w-32">
        <MoneyInput
          defaultValue={item.price}
          name={`items[${item.id}].price`}
          disabled={!isEnabled}
          showLabel={false}
          className="w-auto"
        />
      </TableCell>

      <TableCell className="w-0">
        <Input
          type="number"
          defaultValue={item.quantity}
          name={`items[${item.id}].quantity`}
          disabled={!isEnabled}
        />
      </TableCell>

      <TableCell className="0">
        <Button size="icon" variant="ghost" type="button" disabled={!isEnabled}>
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  )
}

ReceiptForm.AddItemButton = () => {
  return (
    <TableRow className="border-t-none hover:bg-transparent!">
      <TableCell colSpan={9999}>
        <Button type="button" variant="ghost" className="w-full">
          <Plus />
          Add item
        </Button>
      </TableCell>
    </TableRow>
  )
}
