import * as React from 'react'

export const CustomUl: React.FC = ({ children }) => (
    <div className="flex flex-col mt-3">{children}</div>
)

export const CustomLi: React.FC = ({ children }) => (
    <div className="flex mb-5">
        <div className="flex flex-col mr-4 mt-2">
            <div className="bg-amber-400 h-2 w-2 rounded-full" />
        </div>
        <div>{children}</div>
    </div>
)
