import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

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
          {data?.receipts.map((receipt) => (
            <TableRow key={receipt.id}>
              <TableCell>
                {new Date(receipt.date).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell>{receipt.store_name}</TableCell>
              <TableCell>
                {(receipt.total / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function useListReceipts() {
  return useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/receipts')
      return response.json()
    },
  })
}
