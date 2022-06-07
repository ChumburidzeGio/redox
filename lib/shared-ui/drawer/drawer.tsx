import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { classNames } from 'lib/shared-ui'
import { XIcon } from '@heroicons/react/outline'

interface ModalProps {
    show: boolean
    fromLeft?: boolean
    onClose: () => void
    initialFocus?: React.MutableRefObject<HTMLElement | null>
}

export const Drawer: React.FC<ModalProps> = ({
    children,
    show,
    fromLeft,
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

                    <div
                        className={classNames(
                            'pointer-events-none fixed inset-y-0 flex max-w-full',
                            fromLeft ? 'left-0 pr-10' : 'right-0 pl-10'
                        )}
                    >
                        <Transition.Child
                            as={React.Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom={
                                fromLeft
                                    ? '-translate-x-full'
                                    : 'translate-x-full'
                            }
                            enterTo={
                                fromLeft ? 'translate-x-0' : 'translate-x-0'
                            }
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom={
                                fromLeft ? 'translate-x-0' : 'translate-x-0'
                            }
                            leaveTo={
                                fromLeft
                                    ? '-translate-x-full'
                                    : 'translate-x-full'
                            }
                        >
                            {children}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export const DrawerCloseButton: React.FC<
    Pick<ModalProps, 'fromLeft' | 'onClose'>
> = ({ fromLeft, onClose }) => {
    return (
        <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className={classNames(
                    'absolute top-0 pt-1 z-50',
                    fromLeft ? 'right-0' : 'left-0'
                )}
            >
                <button
                    type="button"
                    className="flex items-center justify-center h-10 w-10"
                    onClick={onClose}
                >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
            </div>
        </Transition.Child>
    )
}
