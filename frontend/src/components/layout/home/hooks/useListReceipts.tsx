import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Receipt, ReceiptDTO } from '../types/receipt'

export default function useListReceipts(): UseQueryResult<Receipt[], Error> {
  return useQuery({
    queryKey: ['receipts'],
    queryFn: async () => await fetchReceipts(),
    select: (data) =>
      data.receipts.map((receipt) => ({
        ...receipt,
        date: new Date(receipt.date),
        total: (receipt.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        items: receipt.items.map((item) => ({
          ...item,
          price: (item.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        })),
      })),
  })
}

async function fetchReceipts() {
  const response = await fetch('http://localhost:8000/receipt')

  if (!response.ok) {
    throw new Error('Failed to fetch receipts')
  }

  const data: { receipts: ReceiptDTO[] } = await response.json()

  return data
}
