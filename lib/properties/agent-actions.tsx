import * as React from 'react'
import { Button } from "lib/shared-ui";
import {useUser} from "lib/auth";

export const AgentActions = () => {
    const { role } = useUser()

    if (role !== 'admin') {
        return null
    }

    return (
        <div className="border border-gray-300 divide-y divide-gray-200 rounded-md sm:min-w-[400px] mt-4 sm:mt-0">
            <div className="py-2 px-4 flex flex-row justify-between items-center">
                <div className="mr-10">
                    Artem & Nastya
                </div>
                <Button variant="primary" className="py-1.5">Send</Button>
            </div>
            <div className="py-2 px-4 flex flex-row justify-between items-center">
                <div className="mr-10">
                    Ilya & Luisa
                </div>
                <Button variant="primary" className="py-1.5">Send</Button>
            </div>
            <div className="py-2 px-4 flex flex-row justify-between items-center">
                <div className="mr-10">
                    Johann & Roxana
                </div>
                <Button variant="primary" className="py-1.5">Send</Button>
            </div>
        </div>
    )
}
