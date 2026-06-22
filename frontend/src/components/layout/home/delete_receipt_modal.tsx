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

export default function DeleteReceiptModal() {
  return (
    <Dialog>
      <DeleteReceiptModal.Trigger />

      <DeleteReceiptModal.Content />
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

DeleteReceiptModal.Content = () => {
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
        <Button variant="destructive">Delete</Button>
      </div>
    </DialogContent>
  )
}
