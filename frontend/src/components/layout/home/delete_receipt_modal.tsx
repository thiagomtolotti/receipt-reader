import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { Trash } from 'lucide-react'

import useDeleteReceipt from './hooks/useDeleteReceipt'
import { useState } from 'react'

interface DeleteReceiptModalProps {
  id: string
}

export default function DeleteReceiptModal({ id }: DeleteReceiptModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DeleteReceiptModal.Trigger />

      <DeleteReceiptModal.Content id={id} onClose={() => setOpen(false)} />
    </Dialog>
  )
}

DeleteReceiptModal.Trigger = () => {
  return (
    <DialogTrigger>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete receipt</TooltipContent>
      </Tooltip>
    </DialogTrigger>
  )
}

interface DeleteReceiptModalContentProps {
  id: string
  onClose?: () => void
}

DeleteReceiptModal.Content = ({
  id,
  onClose,
}: DeleteReceiptModalContentProps) => {
  const { mutateAsync, isPending } = useDeleteReceipt()

  async function handleDelete() {
    await mutateAsync(id)
    onClose?.()
  }

  return (
    <DialogContent className="p-8">
      <DialogHeader>
        <DialogTitle>
          <h2 className="font-bold text-xl"> Delete receipt</h2>
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this receipt? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 ml-auto flex gap-4">
        <DialogClose>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>

        <Button
          variant="destructive"
          loading={isPending}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </DialogContent>
  )
}
