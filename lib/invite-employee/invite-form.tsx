import { Button } from "lib/shared-ui";
import * as React from "react";

interface Props {
    inputRef?: React.MutableRefObject<HTMLInputElement | null>
}

export const InviteForm: React.FC<Props> = ({ inputRef }) => {
    return (
        <form action="#" className="mt-6 flex">
            <label htmlFor="email" className="sr-only">
                Email address
            </label>
            <input
                ref={inputRef}
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter an email"
            />
            <Button variant="secondary" className="ml-4 flex-shrink-0">Send invite</Button>
        </form>
    )
}
