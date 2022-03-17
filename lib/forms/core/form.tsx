import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { InputProps } from "./input";
import { Input } from "./input";
import { SimpleSelect } from "./simple-select";
import type { SimpleSelectProps } from "./simple-select";
import { RadioCard } from "./radio-cards";
import type { RadioCardProps } from "./radio-cards";
import { ValidationRule, Message } from "react-hook-form";

export interface ValidationsProps {
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  pattern: ValidationRule<RegExp>;
  valueAsNumber: boolean;
  valueAsDate: boolean;
}

type Inputs = {
  example: string;
  exampleRequired: string;
};

type Field = (InputProps | SimpleSelectProps | RadioCardProps) & {
  type:
    | "text"
    | "email"
    | "hidden"
    | "password"
    | "simple-select"
    | "radio-cards";
  label?: string;
};

export interface FormProps {
  fields: Field[];
  onSubmit?: (fields: any) => void;
  method?: string;
  action?: string;
}

function renderField(props: Field) {
  if (["text", "email", "hidden", "password"].includes(props.type)) {
    return (
      <div className="mb-4">
        <Input {...(props as InputProps)} />
      </div>
    );
  }

  if (["simple-select"].includes(props.type)) {
    return (
      <div className="mb-4">
        <SimpleSelect {...(props as SimpleSelectProps)} />
      </div>
    );
  }

  if (["radio-cards"].includes(props.type)) {
    return (
      <div className="mb-4">
        <RadioCard {...(props as RadioCardProps)} />
      </div>
    );
  }

  return null;
}

export const Form: React.FC<FormProps> = ({
  method,
  action,
  children,
  fields,
  onSubmit,
}) => {
  const methods = useForm<Inputs>({ reValidateMode: "onChange" });
  const onSubmitWrapper = onSubmit
    ? methods.handleSubmit(async (data) => onSubmit(data))
    : undefined;

  return (
    <FormProvider {...methods}>
      <form method={method} action={action} onSubmit={onSubmitWrapper}>
        {fields.map(renderField)}
        {children}
      </form>
    </FormProvider>
  );
};