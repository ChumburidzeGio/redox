import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'
import { useFormContext, Controller } from 'react-hook-form'
import { classNames } from 'lib/shared-ui'
import * as React from 'react'
import { Fragment } from 'react'

interface Option {
    id: string
    title: string
}

export interface ComboboxProps {
    id: string
    defaultValue?: string[]
    disabled?: boolean
    multi?: boolean
    className?: string
    options: Option[]
}

export function Combobox({ id, defaultValue, multi, options }: ComboboxProps) {
    const { control } = useFormContext()
    const defaultOption = React.useMemo(
        () =>
            defaultValue
                ? defaultValue.map((item) => options.find((o) => o.id === item))
                : [],
        [defaultValue, options]
    )

    return (
        <Controller
            control={control}
            name={id}
            defaultValue={defaultOption}
            render={({ field }) => (
                <Listbox
                    as="div"
                    value={field.value}
                    onChange={field.onChange}
                    multiple={multi}
                >
                    {({ open }) => (
                        <>
                            <div className="mt-1 relative">
                                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span
                                        className={classNames(
                                            field.value &&
                                                field.value.length === 0
                                                ? 'text-gray-500'
                                                : '',
                                            'block truncate'
                                        )}
                                    >
                                        {(field.value &&
                                            field.value
                                                ?.map((s: Option) => s.title)
                                                .join(', ')) ||
                                            'Nothing selected'}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {options.map((option) => (
                                            <Listbox.Option
                                                key={option.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active
                                                            ? 'text-white bg-indigo-600'
                                                            : 'text-gray-900',
                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={option}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? 'font-semibold'
                                                                    : 'font-normal',
                                                                'block truncate'
                                                            )}
                                                        >
                                                            {option.title}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active
                                                                        ? 'text-white'
                                                                        : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
            )}
        />
    )
}
