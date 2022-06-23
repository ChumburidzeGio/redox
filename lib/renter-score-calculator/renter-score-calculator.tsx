import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation } from 'react-query'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { Form, RadioCards, Label, Input, SimpleSelect } from 'lib/forms'
import { classNames, Button } from 'lib/shared-ui'
import api from 'lib/api'

const results = [
    {
        color: 'bg-[#ef4444]',
        value: '0 - 49',
    },
    {
        color: 'bg-[#facc14]',
        value: '50 - 90',
    },
    {
        color: 'bg-[#11b981]',
        value: '90 - 100',
    },
]

export const RenterScoreCalculator = () => {
    const [score, setScore] = React.useState(0)
    const [propertiesPerWeek, setPropertiesPerWeek] = React.useState(0)
    const [weeksNeeded, setWeeksNeeded] = React.useState(0)
    const [viewingsNeeded, setViewingsNeeded] = React.useState(0)
    const [recommendedPackage, setRecommendedPackage] =
        React.useState<string>('Standard')

    const getStatus = (score: number) => {
        if (score > 89) {
            return 'Positive'
        }
        if (score > 49) {
            return 'Average'
        }
        return 'Negative'
    }

    const statusColors = {
        Positive: {
            inner: 'rgb(167 243 208)',
            outter: 'rgb(16 185 129)',
            text: 'rgb(16 185 129)',
        },
        Average: {
            inner: 'rgb(254 243 199)',
            outter: 'rgb(251 191 36)',
            text: 'rgb(234 179 8)',
        },
        Negative: {
            inner: 'rgb(254 202 202)',
            outter: 'rgb(185 28 28)',
            text: 'rgb(185 28 28)',
        },
    }

    const details = [
        {
            label: 'Apartments per week',
            value: `${propertiesPerWeek} on average (last2m)`,
        },
        {
            label: 'Time to find',
            value: `${
                weeksNeeded > 1
                    ? weeksNeeded + ' weeks needed.'
                    : weeksNeeded + ' week needed.'
            }`,
        },
        {
            label: 'Viewings needed',
            value: `${viewingsNeeded} on average`,
        },
        {
            label: 'Recommended package',
            value: `${recommendedPackage}`,
        },
    ]
    // This could be CalculatorProps but problem is with
    // type matches then so temporarily its string/string
    const methods = useForm<Record<string, string>>({
        defaultValues: {
            occupation: 'fulltimer',
            who: 'single',
        },
    })

    const occupation = useWatch({
        control: methods.control,
        name: 'occupation',
    })

    const who = useWatch({
        control: methods.control,
        name: 'who',
    })

    const mutation = useMutation(
        (data: { email: string }) => {
            return api.home.renterScore(data)
        },
        {
            onSuccess: (data) => {
                setScore(data.data.score)
                setPropertiesPerWeek(data.data.propertiesPerWeek)
                setWeeksNeeded(data.data.weeksNeeded)
                setViewingsNeeded(data.data.viewingsNeeded)
                setRecommendedPackage(data.data.recommendedPackage)
            },
        }
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="sm:px-5 sm:py-7 flex-1 sm:border sm:border-gray-300 rounded my-12 ">
                <Form
                    onSubmit={(data) => mutation.mutate(data)}
                    methods={methods}
                >
                    <Label id="who">Who is moving?</Label>
                    <RadioCards
                        id="who"
                        rules={{ required: true }}
                        options={[
                            {
                                id: 'single',
                                title: `Single`,
                                description: `It's only me`,
                            },
                            {
                                id: 'couple',
                                title: `Couple`,
                                description: `Me and my partner`,
                            },
                            {
                                id: 'family',
                                title: `Family`,
                                description: `Me, partner and our kids`,
                            },
                        ]}
                    />

                    <div className="mt-6" />
                    <Label id="pets">Do you have any pets?</Label>
                    <RadioCards
                        id="pets"
                        rules={{ required: true }}
                        options={[
                            {
                                id: 'no',
                                title: `None`,
                            },
                            {
                                id: 'dog',
                                title: `Dog(s)`,
                            },
                            {
                                id: 'cat',
                                title: `Cat(s)`,
                            },
                        ]}
                        defaultValue="no"
                    />

                    <div className="mt-6" />
                    <Label id="working">
                        What best describes your work situation?
                    </Label>
                    <SimpleSelect
                        id="occupation"
                        rules={{ required: true }}
                        options={[
                            {
                                key: 'fulltimer',
                                label: `Working full-time in a company for 1+ year contract`,
                            },
                            {
                                key: 'parttimer',
                                label: `Working part-time / Full-time with <1 contract / Zero-hour`,
                            },
                            {
                                key: 'selfemployed',
                                label: `Business owner / Freelancer / ZZP'er`,
                            },
                            {
                                key: 'unemployed',
                                label: `Student / Not working / Other`,
                            },
                        ]}
                    />

                    {occupation !== 'unemployed' && (
                        <>
                            <div className="mt-6" />
                            <Label
                                id="salary"
                                hintText={
                                    who === 'single'
                                        ? ''
                                        : 'Of the whole family'
                                }
                            >
                                Your gross annual income
                            </Label>
                            <Input
                                id="salary"
                                type="number"
                                rules={{ required: true }}
                                placeholder="€70,000"
                                className="mt-1"
                            />
                        </>
                    )}

                    <div className="mt-6" />
                    <Label id="bedrooms">
                        What kind of property are you looking for?
                    </Label>
                    <RadioCards
                        id="bedrooms"
                        rules={{ required: true }}
                        options={[
                            {
                                id: 'studio',
                                title: `Studio`,
                            },
                            {
                                id: '1br',
                                title: `One bedroom`,
                            },
                            {
                                id: '2br',
                                title: `Two bedrooms`,
                            },
                            {
                                id: '3br+',
                                title: `Three+ bedrooms`,
                            },
                        ]}
                        defaultValue="1br"
                    />

                    <div className="mt-6" />
                    <Label id="budget" hintText="Including utilities (g/w/e)">
                        What&apos;s your maximum budget?
                    </Label>
                    <Input
                        id="budget"
                        type="number"
                        rules={{ required: true }}
                        placeholder="€1,600"
                        className="mt-1"
                    />

                    <Button variant="primary" className="mt-3">
                        Calculate
                    </Button>
                </Form>
            </div>
            {(score || mutation.isSuccess) && (
                <div className="sm:px-5 sm:py-7 flex-1 py-8 sm:border sm:border-gray-300 rounded my-12">
                    <div className="max-w-[100px] max-h-1/2 m-auto">
                        <CircularProgressbar
                            value={score}
                            background={true}
                            styles={buildStyles({
                                backgroundColor:
                                    statusColors[getStatus(score)].inner,
                                textSize: '32px',
                                pathTransitionDuration: 5,
                                pathColor:
                                    statusColors[getStatus(score)].outter,
                                trailColor:
                                    statusColors[getStatus(score)].inner,

                                textColor: statusColors[getStatus(score)].text,
                            })}
                            text={`${score}`}
                        />
                    </div>
                    <div className="flex flex-col text-center">
                        <div className="text-2xl mt-4">Renter Score</div>
                        <div className="text-sm mt-6 px-2 sm:px-24 lg:px-48">
                            This score is based on the data you entered above
                            and live data from the market (for the last 2
                            months).
                        </div>
                        <div className="flex justify-around mt-10 sm:px-18 lg:px-40">
                            {results.map((result) => (
                                <div
                                    key={result.value}
                                    className="flex items-center gap-2 mr-2"
                                >
                                    <div
                                        className={classNames(
                                            result.color,
                                            'h-4 w-4 rounded-full'
                                        )}
                                    />
                                    <div>{result.value} </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:px-0 lg:px-20 mt-14">
                            {details.map((detail) => (
                                <div
                                    key={detail.value}
                                    className="flex flex-col  mb-6 text-left border-l-4 border-teal-500 pl-2"
                                >
                                    <div className="sm:text-[16px] lg:text-lg">
                                        {detail.label}
                                    </div>
                                    <div className="sm:text-[14px] lg:text-sm">
                                        {detail.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex sm:px-4 flex-col sm:flex-row gap-x-6">
                            <div className="mt-8 ">
                                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-600  text-left mb-2">
                                    How to start my relocation process?
                                </div>
                                <div className="text-xs sm:text-base text-left leading-snug">
                                    As a first step sign up bellow to create a
                                    free account and get the access to our
                                    knowledge base. Within 24 hours our agent
                                    will reach you out to start your relocation
                                    process as soon as you submit all the
                                    necessary details.
                                </div>
                                <Button
                                    variant="primary"
                                    className="text-xs lg:text-sm mt-3 w-full"
                                >
                                    Create an account
                                </Button>
                            </div>
                            <div className="mt-8">
                                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-600 text-left mb-2">
                                    Do you have questions?
                                </div>
                                <div className="text-xs sm:text-base text-left leading-snug">
                                    Do you still have questions or are not sure
                                    if our relocation service is a good fit for
                                    you? Schedule a free 30 minutes consultation
                                    bellow and we will be happy to answer all
                                    your questions.
                                </div>
                                <Button
                                    variant="yellow"
                                    className="text-xs lg:text-sm mt-3 w-full"
                                >
                                    Schedule a free consultation
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
