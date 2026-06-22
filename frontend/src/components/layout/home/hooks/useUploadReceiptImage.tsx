import { useMutation } from '@tanstack/react-query'
import type { ReceiptDTO } from './useListReceipts'

export default function useUploadReceiptImage() {
  return useMutation({
    mutationFn: async (file: File) => await uploadReceiptImage(file),
  })
}

async function uploadReceiptImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://localhost:8000/receipt', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload receipt image')
  }

  const data: ReceiptDTO = await response.json()

  return data
}
