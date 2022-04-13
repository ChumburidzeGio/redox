import * as React from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"

type Inputs = {
    example: string,
    exampleRequired: string,
}

export interface FormProps {
    onSubmit: (fields: any) => void
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
    const methods = useForm<Inputs>()
    const onSubmitWrapper: SubmitHandler<Inputs> = data => onSubmit(data)

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                {children}
            </form>
        </FormProvider>
    )
}
