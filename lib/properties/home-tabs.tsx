import * as React from 'react'
import { classNames } from '../shared-ui'

interface Tab {
    id: string
    name: string
}

const tabs = [
    { id: 'all', name: 'All apartments' },
    { id: 'archived', name: 'Archived' },
]

interface Props {
    onChange: (id: string) => void
}

export const HomeTabs: React.FC<Props> = ({ onChange }) => {
    const [activeTab, setActiveTab] = React.useState(tabs[0])

    const handleChange = (tab: Tab) => {
        onChange(tab.id)
        setActiveTab(tab)
    }

    return (
        <nav className="flex space-x-4 mb-4" aria-label="Tabs">
            {tabs.map((tab) => (
                <a
                    key={tab.name}
                    onClick={() => handleChange(tab)}
                    className={classNames(
                        activeTab.id === tab.id
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700 cursor-pointer',
                        'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    aria-current={activeTab.id === tab.id ? 'page' : undefined}
                >
                    {tab.name}
                </a>
            ))}
        </nav>
    )
}
