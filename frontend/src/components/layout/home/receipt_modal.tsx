import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { Pen } from 'lucide-react'
import type { Receipt } from './hooks/useListReceipts'
import ReceiptForm from './receipt_form'
import { forwardRef } from 'react'

type ReceiptModalBaseProps = {
  receipt: Receipt
  open?: boolean
  setOpen?: (open: boolean) => void
  isEnabled?: boolean
}

interface UncontrolledReceiptModalProps {
  open?: undefined
  setOpen?: undefined
}

interface ControlledReceiptModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

type ReceiptModalProps = ReceiptModalBaseProps &
  (UncontrolledReceiptModalProps | ControlledReceiptModalProps)

export default function ReceiptModal({
  receipt,
  open,
  setOpen,
  isEnabled = true,
}: ReceiptModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open === undefined && <ReceiptModal.Trigger />}

      <ReceiptModal.Content receipt={receipt} isEnabled={isEnabled} />
    </Dialog>
  )
}

ReceiptModal.Trigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ children, ...props }, ref) => {
  return (
    <DialogTrigger>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" ref={ref} {...props}>
            <Pen />
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit receipt</TooltipContent>
      </Tooltip>
    </DialogTrigger>
  )
})

interface ReceiptModalContentProps {
  receipt: Receipt
  isEnabled?: boolean
}

ReceiptModal.Content = ({ receipt, isEnabled }: ReceiptModalContentProps) => {
  return (
    <DialogContent className="max-w-lg!">
      <DialogHeader className="mb-4">
        <DialogTitle>
          <h2 className="font-bold text-xl">Receipt</h2>
        </DialogTitle>
      </DialogHeader>

      <ReceiptForm receipt={receipt} isEnabled={isEnabled} />
    </DialogContent>
  )
}
