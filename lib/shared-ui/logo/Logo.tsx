import * as React from "react";
import { Badge } from "../badge";

interface LogoProps {
  size?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

export const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <b>
      <span
        className="mr-2 justify-center font-extrabold md:inline hover:opacity-75"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span className={`mr-1 text-${size || "md"}`}>REDOX</span>{" "}
        <Badge color="yellow">beta</Badge>
      </span>
    </b>
  );
};
