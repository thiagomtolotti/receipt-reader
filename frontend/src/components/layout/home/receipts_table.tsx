import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import ReceiptModal from './receipt_modal'
import DeleteReceiptModal from './delete_receipt_modal'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { X } from 'lucide-react'

import type { Receipt } from './hooks/useListReceipts'

import useListReceipts from './hooks/useListReceipts'
import { useState } from 'react'

export default function ReceiptsTable() {
  const { data } = useListReceipts()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Store Name</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((receipt) => (
          <ReceiptsTable.Row key={receipt.id} receipt={receipt} />
        ))}

        {data?.length === 0 && <ReceiptsTable.Empty />}
      </TableBody>
    </Table>
  )
}

interface ReceiptsTableRowProps {
  receipt: Receipt
}

ReceiptsTable.Row = ({ receipt }: ReceiptsTableRowProps) => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)

  return (
    <>
      <TableRow key={receipt.id}>
        <TableCell onClick={openModal}>
          {receipt.date.toLocaleDateString('pt-BR')}
        </TableCell>
        <TableCell onClick={openModal}>{receipt.store_name}</TableCell>
        <TableCell onClick={openModal}>{receipt.total}</TableCell>
        <TableCell>
          <ReceiptsTable.Actions receipt={receipt} />
        </TableCell>
      </TableRow>

      <ReceiptModal
        receipt={receipt}
        open={open}
        setOpen={setOpen}
        isEnabled={false}
      />
    </>
  )
}

interface ReceiptsTableActionsProps {
  receipt: Receipt
}

ReceiptsTable.Actions = ({ receipt }: ReceiptsTableActionsProps) => {
  return (
    <div className="flex gap-2">
      <ReceiptModal receipt={receipt} />

      <DeleteReceiptModal id={receipt.id} />
    </div>
  )
}

ReceiptsTable.Empty = () => {
  return (
    <TableRow className="hover:bg-transparent!">
      <TableCell colSpan={9999}>
        <Empty className="my-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <X />
            </EmptyMedia>
            <EmptyTitle>No receipts found</EmptyTitle>
            <EmptyDescription>
              Try adding some receipts to see them here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  )
}
