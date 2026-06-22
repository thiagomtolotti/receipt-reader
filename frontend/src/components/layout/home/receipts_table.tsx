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
import { Pen, Trash } from 'lucide-react'

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
        <ReceiptsTable.Actions />
      </TableCell>
    </TableRow>
  )
}

ReceiptsTable.Actions = () => {
  return (
    <div className="flex gap-2">
      <ReceiptsTable.EditButton />

      <ReceiptsTable.DeleteButton />
    </div>
  )
}

ReceiptsTable.EditButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button size="icon">
          <Pen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit receipt</TooltipContent>
    </Tooltip>
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
