import * as React from 'react'
import { Button } from "lib/shared-ui";
import { CheckIcon, ArchiveIcon } from "@heroicons/react/solid";
import {useUser} from "../auth";

export const CustomerActions = () => {
    const { role } = useUser()

    if (role !== 'customer') {
        return null
    }

    return (
        <>
            <Button variant="green" className="w-full mb-2 mt-4">
                Request viewing
                <CheckIcon className="h-5 w-5 ml-2" />
            </Button>

            <Button variant="red" className="w-full">
                Archive
                <ArchiveIcon className="h-5 w-5 ml-2" />
            </Button>

        </>
    )
}
