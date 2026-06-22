import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { data } = useListReceipts()

  return (
    <div className="p-8 py-16 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Leitor de notas fiscais</h1>

      {data?.receipts?.map((receipt) =>
        (receipt['total'] / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      ) ?? 'Carregando...'}
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
