import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { classNames, Header } from 'lib/shared-ui'

export function Calculation() {
    const { watch } = useFormContext()
    const payer = watch('payer')
    const extraSchooling = watch('extraSchooling')
    const extraAirportShuttle = watch('extraAirportShuttle')

    const employeePays = React.useMemo(() => payer === 'employee', [payer])

    const totalCost = React.useMemo(() => {
        return extraSchooling ? '€2,240' : '€1,760' // + 480
    }, [extraSchooling])

    const additionalCosts = React.useMemo(() => {
        if (employeePays) {
            return 'N/A'
        }

        return extraAirportShuttle
            ? 'From €80 for the airport shuttle depending on the distance'
            : 'No additional costs'
    }, [extraAirportShuttle, payer])

    return (
        <div className="col-span-5 sm:col-span-2 auto-rows-min mt-5">
            <div className="border border-gray-200 overflow-hidden rounded-lg sm:mt-0 bg-indigo-50 bg-opacity-30">
                <div className="px-4 py-5 sm:px-6">
                    <Header level="4">Order Summary</Header>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="flex flex-col space-y-6">
                        <div className="">
                            <dt className="text-sm font-medium text-gray-500">
                                Package cost
                            </dt>
                            <dd className="mt-1 text-md text-indigo-700 font-semibold">
                                {!employeePays && totalCost}
                                <span
                                    className={classNames(
                                        'text-gray-800 text-sm',
                                        !employeePays ? 'ml-1' : ''
                                    )}
                                >
                                    {employeePays
                                        ? 'Depends on the package employee selects'
                                        : 'excl. 21% VAT'}
                                </span>
                            </dd>
                        </div>
                        <div className="">
                            <dt className="text-sm font-medium text-gray-500">
                                Other costs
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 font-semibold">
                                {additionalCosts}
                            </dd>
                        </div>
                        <div className="">
                            <dt className="text-sm font-medium text-gray-500">
                                Cancellation terms
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                Can be canceled anytime without charges before
                                the first rental offer is sent.
                            </dd>
                        </div>
                        <div className="">
                            <dt className="text-sm font-medium text-gray-500">
                                Payment terms
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                We send the invoice as soon as we check-in your
                                employee in their newly rented property.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
