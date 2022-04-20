import * as React from 'react'
import { ExternalLinkIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { imagesUrl } from "lib/mdx/image";
import { Button } from "lib/shared-ui";

export interface ServicesProps {
    items: {
        logo: string
        label: string
        link: string
        pros: string[]
        cons: string[]
    }[]
    cta: string
}

interface ProOrConProps {
    type: 'pro' | 'con'
}

const ProOrCon: React.FC<ProOrConProps> = ({ type, children }) => (
    <div className="flex flex-row mb-2">
        <div className="inline-flex pt-[2px]">
            {type === "pro"
                ? <PlusCircleIcon className="h-5 w-5 text-teal-500 mr-2" />
                : <MinusCircleIcon className="h-5 w-5 text-rose-500 mr-2" />}
        </div>
        <div className="">{children}</div>
    </div>
)

export const Services: React.FC<ServicesProps> = ({ items, cta }) => (
    <div className="grid align-start gap-10 my-10 grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto">
        {items.map(item => (
            <a key={item.label} href={item.link} target="_blank" rel="noreferrer" className="flex border border-gray-300 shadow overflow-hidden flex-col rounded-md no-underline relative h-fit">
                <div className="flex h-[100px] overflow-hidden justify-center px-6 border-b border-gray-200">
                    <img src={imagesUrl(item.logo)} alt={`${item.label} service`} className="block max-h-[100px] w-auto m-auto" />
                </div>
                <div className="px-5 mt-4">
                    <div className="text-lg font-semibold mb-2 text-black">{item.label}</div>
                    <div className="text-slate-800">
                        {item.pros.map(pro => (
                            <ProOrCon key={pro} type="pro">{pro}</ProOrCon>
                        ))}
                        {item.cons.map(con => (
                            <ProOrCon key={con} type="con">{con}</ProOrCon>
                        ))}
                    </div>
                </div>
                <div className="px-5 mt-4 mb-4">
                    <Button variant="secondary" className="w-full">
                        {cta}
                        <ExternalLinkIcon className="h-5 w-5 ml-3" />
                    </Button>
                </div>
            </a>
        ))}
    </div>
)
