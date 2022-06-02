import { RegisterOptions } from 'react-hook-form'

export type ValidationsProps = Pick<
  RegisterOptions,
  | 'required'
  | 'min'
  | 'max'
  | 'maxLength'
  | 'minLength'
  | 'pattern'
  | 'valueAsNumber'
  | 'valueAsDate'
  | 'validate'
  | 'deps'
>
