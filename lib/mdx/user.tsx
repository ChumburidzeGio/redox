import * as React from "react";
import { useUser } from "lib/auth";

export interface UserProps {
  is: "free-customer" | "paid-customer" | "admin";
}

export const User: React.FC<UserProps> = ({ is, children }) => {
  const { role } = useUser();
  const isMatched = React.useMemo(() => role === is, [is, role]);
  return isMatched ? <>{children}</> : null;
};
