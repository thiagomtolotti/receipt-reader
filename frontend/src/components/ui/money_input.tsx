import { cn } from '#/lib/utils'
import { Field, FieldLabel } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number
  isEnabled?: boolean
  showLabel?: boolean
}

export default function MoneyInput({
  defaultValue,
  isEnabled = true,
  showLabel = true,
  className,
  ...props
}: MoneyInputProps) {
  return (
    <Field className={cn('w-40 ml-auto', className)}>
      {showLabel && <FieldLabel className="ml-auto!">Total</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          defaultValue={
            defaultValue !== undefined
              ? (defaultValue / 100).toFixed(2)
              : undefined
          }
          className="text-right"
          disabled={!isEnabled}
          type="number"
          {...props}
        />

        <InputGroupAddon align="inline-start">$</InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
