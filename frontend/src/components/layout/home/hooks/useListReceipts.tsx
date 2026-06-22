import { useQuery } from '@tanstack/react-query'

export default function useListReceipts() {
  return useQuery({
    queryKey: ['receipts'],
    queryFn: async () => await fetchReceipts(),
    select: (data) =>
      data.receipts.map((receipt) => ({
        ...receipt,
        date: new Date(receipt.date).toLocaleDateString('pt-BR'),
        total: (receipt.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
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
  const response = await fetch('http://localhost:8000/receipts')

  if (!response.ok) {
    throw new Error('Failed to fetch receipts')
  }

  const data: { receipts: ReceiptDTO[] } = await response.json()

  return data
}
