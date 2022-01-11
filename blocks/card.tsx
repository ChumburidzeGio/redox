import * as React from 'react'
import Youtube from "./youtube";

interface Props {
    videoId: string
}

export const YoutubeCard: React.FC<Props> = ({ videoId, children }) => {
    return (
        <div style={{ display: 'flex', flexFlow: 'row', border: "2px solid #c1c1c1", borderRadius: "8px", marginTop: "20px", overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: "1 0 auto" }}><Youtube id={videoId} height={200} /></div>
            <div style={{ display: 'flex', padding: "10px 15px" }}>{children}</div>
        </div>
    )
}
