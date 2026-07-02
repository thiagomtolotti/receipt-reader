import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-8 py-16 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Meals</h1>

      <div className="flex flex-col gap-4">
        {/* <AddReceiptModal /> */}

        {/* <ReceiptsTable /> */}
      </div>
    </div>
  )
}
