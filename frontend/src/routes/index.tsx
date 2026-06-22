import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import useListReceipts from '#/components/layout/home/hooks/useListReceipts'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { data } = useListReceipts()

  return (
    <div className="p-8 py-16 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Receipt Reader</h1>

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
    </div>
  )
}
