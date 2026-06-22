import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import useListReceipts from './hooks/useListReceipts'

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
          <TableRow key={receipt.id} className="cursor-pointer">
            <TableCell>{receipt.date}</TableCell>
            <TableCell>{receipt.store_name}</TableCell>
            <TableCell>{receipt.total}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
