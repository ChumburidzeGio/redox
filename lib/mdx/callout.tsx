import * as React from 'react'

export interface CalloutProps {
    type?: 'warning'
}

export const Callout: React.FC<CalloutProps> = ({ type, children }) => {
    return (
        <div
            className={`shadow rounded-md overflow-hidden border border-gray-300 border-l-0 mt-4`}
        >
            <div
                className={`flex p-4 border-l-4 ${
                    type === 'warning' ? 'border-yellow-400' : 'border-cyan-500'
                }`}
            >
                <div className="ml-3">
                    <p className={`text-md`}>{children}</p>
                </div>
            </div>
        </div>
    )
}
