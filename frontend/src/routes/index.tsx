import AddReceiptModal from '#/components/layout/home/add_receipt_modal'
import ReceiptsTable from '#/components/layout/home/receipts_table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8 py-16 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Receipt Reader</h1>

      <div className="flex flex-col gap-4">
        <AddReceiptModal />

        <ReceiptsTable />
      </div>
    </div>
  )
}
