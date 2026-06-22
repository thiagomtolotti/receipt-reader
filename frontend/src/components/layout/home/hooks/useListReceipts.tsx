import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'

export interface Receipt {
  id: string
  date: Date
  store_name: string
  total: string
  items: ReceiptItem[]
}

export interface ReceiptItem {
  id: string
  name: string
  price: string
  quantity: number
}

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

interface ReceiptDTO {
  id: string
  date: string
  store_name: string
  total: number
  items: ReceiptItemDTO[]
}

interface ReceiptItemDTO {
  id: string
  name: string
  price: number
  quantity: number
}

async function fetchReceipts() {
  const response = await fetch('http://localhost:8000/receipt')

  if (!response.ok) {
    throw new Error('Failed to fetch receipts')
  }

  const data: { receipts: ReceiptDTO[] } = await response.json()

  return data
}
