import * as React from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"

type Inputs = {
    example: string,
    exampleRequired: string,
}

export interface FormProps {
    onSubmit: (fields: any) => void
}


export const Form: React.FC<FormProps> = ({ children }) => {
    const methods = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}
