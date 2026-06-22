import { useMutation } from '@tanstack/react-query'

export default function useDeleteReceipt() {
  return useMutation({
    mutationFn: deleteReceipt,
  })
}

async function deleteReceipt(receiptId: string) {
  const response = await fetch(`http://localhost:8000/receipt/${receiptId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete receipt')
  }
}
