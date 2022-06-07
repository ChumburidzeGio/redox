import * as React from 'react'
import { AppLayout } from '../lib/layouts'
import { Header } from '../lib/shared-ui'
import { PropertiesList } from 'lib/properties'

export default function RentPage() {
    return (
        <AppLayout>
            <div className="mx-1">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0">
                        <Header level="1">Rent Module</Header>
                    </div>
                </div>

                <PropertiesList />
            </div>
        </AppLayout>
    )
}
