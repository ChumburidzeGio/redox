import {Message, ValidationRule} from "react-hook-form";


export interface ValidationsProps {
    required?: Message | ValidationRule<boolean>;
    min?: ValidationRule<number | string>;
    max?: ValidationRule<number | string>;
    maxLength?: ValidationRule<number>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
    valueAsNumber?: boolean;
    valueAsDate?: boolean;
}
