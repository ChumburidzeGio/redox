import * as React from 'react'
import { Button, Drawer, Header } from '../shared-ui'
import { SearchProfile } from './types'
import { ChevronLeftIcon, PlayIcon, PauseIcon } from '@heroicons/react/outline'
import { Combobox, ErrorText, Form, Input, Label, RadioCards } from '../forms'
import { useForm } from 'react-hook-form'
import { toTitleCase } from './utils'

const districts = [
    'centrum',
    'west',
    'zaandam',
    'noord',
    'oost',
    'newwest',
    'zuid',
    'amstelveen',
    'zuidoost',
    'haarrlem',
    'hoofddorp',
    'duivendrecht',
    'utrecht',
]

interface EditProfileProps {
    profile: SearchProfile
    open: boolean
    setOpen: (open: boolean) => void
}

export const EditProfile = ({ profile, open, setOpen }: EditProfileProps) => {
    const methods = useForm()
    const options = React.useMemo(
        () =>
            districts.map((district) => ({
                id: district,
                title: toTitleCase(district),
            })),
        []
    )

    const interior = React.useMemo(() => {
        if (!profile.interior || profile.interior.length < 1) {
            return 'any'
        }

        return profile.interior.indexOf('furnished') > -1
            ? 'furnished'
            : 'upholstered'
    }, [profile.interior])

    const type = React.useMemo(() => {
        if (!profile.type || profile.type.length < 1) {
            return 'any'
        }

        return profile.type.indexOf('apartment') > -1 ? 'apartment' : 'house'
    }, [profile.type])

    return (
        <Drawer show={open} onClose={() => setOpen(false)}>
            <div className="pointer-events-auto w-screen max-w-lg">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex flex-col px-6 pt-6 pb-7">
                        <div
                            className="flex flex-row items-center cursor-pointer flex sm:hidden text-blue-600 font-semibold text-sm"
                            onClick={() => setOpen(false)}
                        >
                            <ChevronLeftIcon className="h-5 mr-1" />
                            Go Back
                        </div>

                        <Header level="2">{profile.relocationName}</Header>
                        <Form
                            onSubmit={(data) => console.log(data)}
                            // @ts-ignore
                            methods={methods}
                        >
                            <div className="flex flex-col rounded-md gap-y-6 mt-6">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-1/2 sm:pr-4">
                                        <Label id="priceMin">Min Price</Label>
                                        <Input
                                            id="priceMin"
                                            type="text"
                                            className="mt-1"
                                            rules={{ required: true }}
                                            defaultValue={profile.priceMin}
                                        />
                                        <ErrorText id="priceMin">
                                            Please enter min price
                                        </ErrorText>
                                    </div>

                                    <div className="sm:w-1/2 sm:pl-4 mt-3 sm:mt-0">
                                        <Label id="priceMax">Max Price</Label>
                                        <Input
                                            id="priceMax"
                                            type="text"
                                            className="mt-1"
                                            rules={{ required: true }}
                                            defaultValue={profile.priceMax}
                                        />
                                        <ErrorText id="priceMax">
                                            Please enter max price
                                        </ErrorText>
                                    </div>
                                </div>

                                <div className="max-w-full">
                                    <Label id="districtsInclude">
                                        Districts
                                    </Label>
                                    <Combobox
                                        id="districtsInclude"
                                        multi
                                        options={options}
                                        defaultValue={profile.districtsInclude}
                                    />
                                </div>
                                <div>
                                    <Label id="interior">Interior</Label>
                                    <RadioCards
                                        id="interior"
                                        perRow="3"
                                        options={[
                                            {
                                                id: 'any',
                                                title: 'Any',
                                            },
                                            {
                                                id: 'furnished',
                                                title: 'Furnished',
                                            },
                                            {
                                                id: 'upholstered',
                                                title: 'Upholstered',
                                            },
                                        ]}
                                        defaultValue={interior}
                                    />
                                </div>
                                <div>
                                    <Label id="type">Type</Label>
                                    <RadioCards
                                        id="type"
                                        perRow="3"
                                        options={[
                                            {
                                                id: 'any',
                                                title: 'Any',
                                            },
                                            {
                                                id: 'apartment',
                                                title: 'Apartment',
                                            },
                                            {
                                                id: 'house',
                                                title: 'House',
                                            },
                                        ]}
                                        defaultValue={type}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-1/2 sm:pr-4">
                                        <Label id="surfaceMin">
                                            Surface min
                                        </Label>
                                        <Input
                                            id="surfaceMin"
                                            type="text"
                                            className="mt-1"
                                            defaultValue={
                                                profile.surfaceMin || undefined
                                            }
                                        />
                                    </div>

                                    <div className="sm:w-1/2 sm:pl-4 mt-3 sm:mt-0">
                                        <Label id="roomsMin">Rooms min</Label>
                                        <Input
                                            id="roomsMin"
                                            type="text"
                                            className="mt-1"
                                            defaultValue={
                                                profile.roomsMin || undefined
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label id="active">Profile status</Label>
                                    <RadioCards
                                        id="active"
                                        perRow="2"
                                        options={[
                                            {
                                                id: '1',
                                                Icon: PlayIcon,
                                                title: 'Active',
                                            },
                                            {
                                                id: '0',
                                                Icon: PauseIcon,
                                                title: 'Paused',
                                            },
                                        ]}
                                        defaultValue={
                                            profile.active ? '1' : '0'
                                        }
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full items-center"
                                >
                                    Update profile
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}
