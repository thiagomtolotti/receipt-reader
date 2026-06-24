import { Field, FieldLabel } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number
  isEnabled?: boolean
}

export default function MoneyInput({
  defaultValue,
  isEnabled = true,
}: MoneyInputProps) {
  return (
    <Field className="w-40 ml-auto">
      <FieldLabel className="ml-auto!">Total</FieldLabel>

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
          name="total"
        />

        <InputGroupAddon align="inline-start">$</InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
