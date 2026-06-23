import { useMutation } from '@tanstack/react-query'
import type { CreateReceiptDTO } from './useListReceipts'

export default function useSaveReceipt(id?: string) {
  const update = useMutation({
    mutationFn: async (data: CreateReceiptDTO) => updateReceipt(id!, data),
  })

  const create = useMutation({
    mutationFn: async (data: CreateReceiptDTO) => createReceipt(data),
  })

  return id ? update : create
}

async function createReceipt(data: CreateReceiptDTO) {
  const response = await fetch('http://localhost:8000/receipt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

async function updateReceipt(id: string, data: CreateReceiptDTO) {
  const response = await fetch(`http://localhost:8000/receipt/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
