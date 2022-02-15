import * as React from "react";

export interface YoutubeProps {
    id: string
    height?: number
}

export const Youtube = ({ id, height }: YoutubeProps) => (
    <>
        <br />
        <iframe
            className="rounded-md"
            src={`https://www.youtube.com/embed/${id}`}
            width="100%"
            height={`${height || 500}px`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </>
)

export interface YoutubeCardProps {
    id: string
}

export const YoutubeCard: React.FC<YoutubeCardProps> = ({ id, children }) => {
    return (
        <div style={{ display: 'flex', flexFlow: 'row', border: "2px solid #c1c1c1", borderRadius: "8px", marginTop: "20px", overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: "1 0 auto" }}><Youtube id={id} height={200} /></div>
            <div style={{ display: 'flex', flexFlow: 'column', padding: "10px 15px" }}>{children}</div>
        </div>
    )
}
