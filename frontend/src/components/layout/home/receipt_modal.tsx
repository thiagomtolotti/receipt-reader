import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
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
import ReceiptForm from './receipt_form'

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
    <DialogContent className="max-w-lg!">
      <DialogHeader className="mb-4">
        <DialogTitle>
          <h2 className="font-bold text-xl">Receipt</h2>
        </DialogTitle>
      </DialogHeader>

      <ReceiptForm receipt={receipt} />
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
