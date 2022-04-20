import * as React from "react"
import { SubmitHandler, FormProvider , UseFormReturn} from "react-hook-form"

export interface FormProps {
    onSubmit: (fields: any) => void
    methods: UseFormReturn
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, methods }) => {
    const onSubmitWrapper: SubmitHandler<{}> = data => onSubmit(data)

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
                {children}
            </form>
        </FormProvider>
    )
}
