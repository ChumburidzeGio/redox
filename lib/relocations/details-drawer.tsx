import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
    show: boolean
    onClose: () => void
    initialFocus?: React.MutableRefObject<HTMLElement | null>
}

export const DetailsDrawer: React.FC<ModalProps> = ({
    children,
    show,
    onClose,
    initialFocus,
}) => {
    return (
        <Transition.Root show={show} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-hidden"
                onClose={onClose}
                initialFocus={initialFocus}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={React.Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    {children}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
