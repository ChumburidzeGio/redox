import * as React from "react";
import { XIcon } from '@heroicons/react/outline'
import {Button, Header} from "lib/shared-ui";
import {InviteModal} from "./invite-modal";
import {InviteForm} from "./invite-form";

export function InviteEmployee() {
    const [open, setOpen] = React.useState(false)
    const inputRef = React.useRef(null)

    return (
        <div>
            <InviteModal show={open} onClose={() => setOpen(false)} initialFocus={inputRef}>
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <Header level="3">Invite your employee</Header>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div>
                    <div className="mt-3 text-center sm:mt-5">
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                            </p>
                        </div>
                    </div>
                </div>

                <InviteForm inputRef={inputRef} />
            </InviteModal>
            <Button type="primary" onClick={() => setOpen(true)}>Invite Employee</Button>
        </div>
    )
}
