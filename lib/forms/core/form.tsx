import * as React from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { Input } from "./input"
import type { InputProps } from "./input"
import { SimpleSelect } from "./simple-select"
import type { SimpleSelectProps } from "./simple-select"
import { RadioCard } from "./radio-cards"
import type { RadioCardProps } from "./radio-cards"

type Inputs = {
    example: string,
    exampleRequired: string,
}

type Field = (InputProps | SimpleSelectProps | RadioCardProps) & {
    type: 'text' | 'email' | 'hidden' | 'password' | 'simple-select' | 'radio-cards'
}

export interface FormProps {
    fields: Field[]
    onSubmit: (fields: any) => void
}

function renderField(props: Field) {
    if (['text', 'email', 'hidden', 'password'].includes(props.type)) {
        return <div className="mb-4"><Input {...props as InputProps} /></div>
    }

    if (['simple-select'].includes(props.type)) {
        return <div className="mb-4"><SimpleSelect {...props as SimpleSelectProps} /></div>
    }

    if (['radio-cards'].includes(props.type)) {
        return <div className="mb-4"><RadioCard {...props as RadioCardProps} /></div>
    }

    return null
}

export const Form: React.FC<FormProps> = ({ children, fields }) => {
    const methods = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {fields.map(renderField)}
                <br />
                {children}
            </form>
        </FormProvider>
    )
}
