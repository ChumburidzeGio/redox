import * as React from "react"
import {compile} from '@mdx-js/mdx'

export default function MdPreview() {
    const [compiled, setCompiled] = React.useState("")

    React.useEffect(() => {
        compile('').then(console.log)
    }, [])

    return (
        <div className="h-full min-h-screen bg-gray-50">

        </div>
    )
}
