import * as React from 'react'
import { ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { classNames, DateFormat, Drawer } from 'lib/shared-ui'
import { Avatar } from './avatar'
import { RelocationTasks } from './relocation-tasks'
import { RelocationDts } from './dts/relocation.dts'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { logEvent } from '../analytics'

interface TagProps {
    dotColor: string
    textColor: string
}

const Tag: React.FC<TagProps> = ({ dotColor, textColor, children }) => {
    return (
        <div className="inline-flex items-center text-sm">
            <span className="absolute flex-shrink-0 flex items-center justify-center">
                <span
                    className={classNames(dotColor, 'h-1.5 w-1.5 rounded-full')}
                    aria-hidden="true"
                />
            </span>
            <span className={classNames(textColor, 'ml-3.5 font-medium')}>
                {children}
            </span>
        </div>
    )
}

function RelocationStatus({ status }: { status: RelocationDts['status'] }) {
    if (status === 'completed') {
        return (
            <Tag dotColor="bg-teal-300" textColor="text-gray-900">
                Completed
            </Tag>
        )
    }

    if (status === 'cancelled') {
        return (
            <Tag dotColor="bg-red-300" textColor="text-gray-900">
                Canceled
            </Tag>
        )
    }

    if (status === 'active') {
        return (
            <Tag dotColor="bg-teal-500" textColor="text-gray-900">
                Active
            </Tag>
        )
    }

    return null
}

function Progress({ rate, faded }: { rate: number; faded: boolean }) {
    return (
        <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
                className={classNames(
                    faded ? 'bg-indigo-300' : 'bg-indigo-600',
                    'h-2 rounded-full'
                )}
                style={{
                    width: `${rate}%`,
                }}
            />
        </div>
    )
}

export const EmployeeCard: React.FC<{ relocation: RelocationDts }> = ({
    relocation,
}) => {
    const [showDetails, setShowDetails] = React.useState(false)

    const handleOpen = () => {
        logEvent('redox:employer:viewRelocation', { id: relocation.id })
        setShowDetails(true)
    }

    return (
        <li
            className="block hover:bg-gray-50 cursor-pointer"
            onClick={handleOpen}
        >
            <Drawer show={showDetails} onClose={() => setShowDetails(false)}>
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex flex-col px-6 pt-6 pb-7">
                            <div
                                className="flex flex-row items-center cursor-pointer flex sm:hidden text-blue-600 font-semibold text-sm"
                                onClick={() => setShowDetails(false)}
                            >
                                <ChevronLeftIcon className="h-5 mr-1" />
                                Go Back
                            </div>
                            <div className="flex items-center mb-5 mt-5 sm:mt-0">
                                <div className="">
                                    <Avatar
                                        flag={relocation.from.emoji}
                                        size="lg"
                                    />
                                </div>
                                <div className="ml-5">
                                    <p className="text-2xl font-bold text-gray-700 group-hover:text-gray-900">
                                        {relocation.name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 flex items-center">
                                        <span>{relocation.email}</span>
                                    </p>
                                </div>
                            </div>

                            <Progress
                                rate={relocation.progress}
                                faded={relocation.status !== 'active'}
                            />

                            <div className="mt-6">
                                <h3 className="font-medium text-gray-900">
                                    Details
                                </h3>
                                <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">
                                            Origin Country
                                        </dt>
                                        <dd className="text-gray-900">
                                            {relocation.from.name}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">
                                            Authorized
                                        </dt>
                                        <dd className="text-gray-900">
                                            <DateFormat
                                                date={relocation.createdAt}
                                                format="MMM DD, YYYY"
                                            />
                                        </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">
                                            Last Activity
                                        </dt>
                                        <dd className="text-gray-900">
                                            <DateFormat
                                                date={relocation.updatedAt}
                                                format="MMM DD, YYYY"
                                            />
                                        </dd>
                                    </div>
                                    {relocation.completedAt && (
                                        <div className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">
                                                Completed At
                                            </dt>
                                            <dd className="text-gray-900">
                                                <DateFormat
                                                    date={
                                                        relocation.completedAt
                                                    }
                                                    format="MMM DD, YYYY"
                                                />
                                            </dd>
                                        </div>
                                    )}
                                    {relocation.canceledAt && (
                                        <div className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">
                                                Canceled At
                                            </dt>
                                            <dd className="text-gray-900">
                                                <DateFormat
                                                    date={relocation.canceledAt}
                                                    format="MMM DD, YYYY"
                                                />
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-medium text-gray-900">
                                    Tasks
                                </h3>
                                <RelocationTasks tasks={relocation.tasks} />
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                        <Avatar flag={relocation.from.emoji} size="md" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">
                                {relocation.name}
                            </p>
                            <p className="mt-1 flex items-center text-sm text-gray-500">
                                <MailIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span className="truncate">
                                    {relocation.email}
                                </span>
                            </p>
                        </div>
                        <div className="hidden md:block mt-2">
                            <div className="flex flex-row mb-2">
                                <RelocationStatus status={relocation.status} />
                                <p className="text-sm text-gray-900 ml-3">
                                    Last Activity:
                                    <DateFormat
                                        date={relocation.updatedAt}
                                        format="MMM DD, YYYY"
                                        className="ml-1"
                                    />
                                </p>
                            </div>
                            <div className="w-[230px]">
                                <Progress
                                    rate={relocation.progress}
                                    faded={relocation.status !== 'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </li>
    )
}
