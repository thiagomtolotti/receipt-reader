import { Button } from '#/components/ui/button'
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
import useListReceipts from './hooks/useListReceipts'
import type { Receipt } from './hooks/useListReceipts'
import { Trash } from 'lucide-react'
import ReceiptModal from './receipt_modal'

export default function ReceiptsTable() {
  const { data } = useListReceipts()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Store Name</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((receipt) => (
          <ReceiptsTable.Row key={receipt.id} receipt={receipt} />
        ))}
      </TableBody>
    </Table>
  )
}

interface ReceiptsTableRowProps {
  receipt: Receipt
}

ReceiptsTable.Row = ({ receipt }: ReceiptsTableRowProps) => {
  return (
    <TableRow key={receipt.id} className="cursor-pointer">
      <TableCell>{receipt.date.toLocaleDateString('pt-BR')}</TableCell>
      <TableCell>{receipt.store_name}</TableCell>
      <TableCell>{receipt.total}</TableCell>
      <TableCell>
        <ReceiptsTable.Actions receipt={receipt} />
      </TableCell>
    </TableRow>
  )
}

interface ReceiptsTableActionsProps {
  receipt: Receipt
}

ReceiptsTable.Actions = ({ receipt }: ReceiptsTableActionsProps) => {
  return (
    <div className="flex gap-2">
      <ReceiptModal receipt={receipt} />

      <ReceiptsTable.DeleteButton />
    </div>
  )
}

ReceiptsTable.DeleteButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete receipt</TooltipContent>
    </Tooltip>
  )
}
