import * as React from "react";

export interface YoutubeProps {
    id: string
}

export const Youtube = ({ id }: YoutubeProps) => (
    <div className="relative mt-6 pb-[61.74957118353345%] h-0">
        <br />
        <iframe
            className="rounded-md absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
)

export interface YoutubeCardProps {
    id: string
}

export const YoutubeCard: React.FC<YoutubeCardProps> = ({ id, children }) => {
    return (
        <div className="flex flex-col md:flex-row border-2 border-gray-200 rounded-md mt-6 overflow-hidden">
            <div className="flex flex-[1_0_auto]">
                <iframe
                    className="top-0 left-0 w-full h-200"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            <div style={{ display: 'flex', flexFlow: 'column', padding: "10px 15px" }}>{children}</div>
        </div>
    )
}
