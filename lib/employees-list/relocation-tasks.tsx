import * as React from 'react'
import { CreditCardIcon, FlagIcon, LightningBoltIcon, SupportIcon, HomeIcon } from "@heroicons/react/solid";
import {classNames} from "lib/shared-ui";
import {TaskDts} from "./dts/relocation.dts";

const taskToIcon: Record<string, React.FC<React.ComponentProps<'svg'>>> = {
    'settle_bsn': FlagIcon,
    'rent': HomeIcon,
    'rent_utilities': LightningBoltIcon,
    'settle_banking': CreditCardIcon,
    'settle_insurance': SupportIcon,
}

const Task: React.FC<{ task: TaskDts }> = ({ task }) => {
    const Icon = React.useMemo(() => taskToIcon[task.id], [task.id])

    return (
        <li className="col-span-1 flex">
            <div
                className={classNames(
                    '',
                    'flex-shrink-0 flex items-center justify-center w-12'
                )}
            >
                <Icon className={classNames(
                    task.status === 'active' ? 'text-blue-600' : task.status === 'completed' ? 'text-emerald-600' : 'text-gray-400',
                    "h-7 w-7"
                )} />
            </div>
            <div className="flex-1 flex items-center justify-between truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                    <span className="text-gray-900 font-medium hover:text-gray-600">
                        {task.name}
                    </span>
                    <p className="text-gray-500">
                        {task.status}
                        {task.stage && (
                            <div className="inline-block ml-2">
                                <div className="inline-block mr-2">|</div>
                                {task.stage}
                            </div>
                        )}
                        {task.appointment && (
                            <div className="inline-block ml-2">
                                <div className="inline-block mr-2">|</div>
                                {task.appointment}
                            </div>
                        )}
                    </p>
                </div>
            </div>
        </li>
    )
}

export const RelocationTasks: React.FC<{ tasks: TaskDts[] }> = ({ tasks }) => {
    return (
        <ul role="list" className="flex flex-col divide-y divide-gray-200">
            {tasks.map(task => (
                <Task task={task} />
            ))}
        </ul>
    )
}
