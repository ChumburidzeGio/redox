import * as React from 'react'
import {CheckCircleIcon, ChevronRightIcon, MailIcon} from "@heroicons/react/solid";
import {Avatar} from "./avatar";

export interface EmployeeCardProps {
    from: string
    name: string
    email: string
    appliedAt: string
    stage: string
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ appliedAt, email, stage, from, name }) => {
    return (
        <li className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                        <Avatar country={from} />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span className="truncate">{email}</span>
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div>
                                <p className="text-sm text-gray-900">
                                    Applied on {appliedAt}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                    {stage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
            </div>
        </li>
    )
}
