import { useMutation } from '@tanstack/react-query'
import type { Receipt, ReceiptDTO } from './useListReceipts'

export default function useUploadReceiptImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const receipt = await uploadReceiptImage(file)

      const res: Receipt = {
        id: receipt.id,
        store_name: receipt.store_name,
        date: new Date(receipt.date),
        total: (receipt.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        items: receipt.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: (item.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          quantity: item.quantity,
        })),
      }
      return res
    },
  })
}

async function uploadReceiptImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://localhost:8000/receipt/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload receipt image')
  }

  const data: ReceiptDTO = await response.json()

  return data
}
