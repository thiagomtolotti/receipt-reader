import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { Pen } from 'lucide-react'
import type { Receipt } from './hooks/useListReceipts'

interface ReceiptModalProps {
  receipt: Receipt
}

export default function ReceiptModal({ receipt }: ReceiptModalProps) {
  return (
    <Dialog>
      <ReceiptModal.Trigger />

      <ReceiptModal.Content receipt={receipt} />
    </Dialog>
  )
}

ReceiptModal.Trigger = () => {
  return (
    <DialogTrigger>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon">
            <Pen />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit receipt</TooltipContent>
      </Tooltip>
    </DialogTrigger>
  )
}

ReceiptModal.Content = ({ receipt }: ReceiptModalProps) => {
  return (
    <DialogContent className="p-8 max-w-lg!">
      <DialogHeader className="mb-4">
        <DialogTitle>
          <h2 className="font-bold text-xl">Receipt</h2>
        </DialogTitle>
      </DialogHeader>

      <form className="flex flex-col gap-4">
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
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </DialogContent>
  )
}

interface ReceiptModalItemsListProps {
  items: Receipt['items']
}

ReceiptModal.ItemsList = ({ items }: ReceiptModalItemsListProps) => {
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
              <Input defaultValue={item.name} />
            </TableCell>
            <TableCell className="w-32">
              <Input defaultValue={item.price} />
            </TableCell>
            <TableCell className="w-0">
              <Input type="number" defaultValue={item.quantity} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
