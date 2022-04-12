import * as React from 'react'
import {CheckCircleIcon, ChevronRightIcon, MailIcon} from "@heroicons/react/solid";
import {Avatar} from "./avatar";

const applications = [
    {
        applicant: {
            name: 'Ricardo Cooper',
            email: 'US -> Amsterdam',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Kristen Ramos',
            email: 'Serbia -> Amsterdam',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Ted Fox',
            email: 'Latvia -> Amsterdam',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
]

export const EmployeesList = () => {
    return (
        <div className="mt-7 overflow-hidden sm:rounded-md border border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
                {applications.map((application) => (
                    <li key={application.applicant.email}>
                        <a href={application.href} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="flex-shrink-0">
                                        <Avatar name={application.applicant.name} />
                                    </div>
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">{application.applicant.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span className="truncate">{application.applicant.email}</span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Applied on <time dateTime={application.date}>{application.dateFull}</time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                    {application.stage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
