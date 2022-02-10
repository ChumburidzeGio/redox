import * as React from "react";
import slugger from "./slugger";

export const CustomH1: React.FC = ({ children }) => (
    <h1 className="text-4xl mt-1 font-bold text-gray-900" id={slugger(children as string)}>{children}</h1>
)

export const CustomH2: React.FC = ({ children }) => (
    <h1 className="text-3xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>{children}</h1>
)

export const CustomH3: React.FC = ({ children }) => (
    <h1 className="text-xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>{children}</h1>
)

export const CustomP: React.FC = ({ children }) => (
    <h1 className="text-md mt-7 text-gray-900">{children}</h1>
)
