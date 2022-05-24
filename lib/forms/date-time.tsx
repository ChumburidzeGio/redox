import * as React from "react";
import { useFormContext } from "react-hook-form";
// import { ExclamationCircleIcon } from "@heroicons/react/solid";
// import { classNames } from "lib/shared-ui";
// import dayjs from "dayjs";
import type { ValidationsProps } from "./validation-props";

export interface InputProps {
  id: string;
  defaultValue?: string;
  hidden?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value: Date;
  rules?: Omit<ValidationsProps, "valueAsDate">;
}

export const DateTime: React.FC<InputProps> = ({
  id,
  rules,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <input
        className="w-full rounded"
        type="datetime-local"
        id="viewing-time"
        placeholder="Set Viewing"
        {...register(id, rules)}
      />
    </div>
  );
};
