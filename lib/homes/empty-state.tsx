import * as React from 'react'

interface EmptyStateProps {
    Icon: React.FC<React.ComponentProps<'svg'>>
    title: string
    description: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    Icon,
    title,
    description,
    children,
}) => {
    return (
        <div className="bg-slate-50 p-3 rounded-lg">
            <div className="max-w-xl mx-auto mt-12 mb-12">
                <div>
                    <div className="text-center">
                        <Icon className="mx-auto h-16 w-16 text-indigo-600" />
                        <h2 className="mt-2 text-xl font-medium text-gray-900">
                            {title}
                        </h2>
                        <p className="mt-1 text-md text-gray-500">
                            {description}
                        </p>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
