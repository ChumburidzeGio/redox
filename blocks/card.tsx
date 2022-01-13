import * as React from 'react'
import { MdMap } from 'react-icons/md'
import { AiFillYoutube } from 'react-icons/ai'
import Youtube from "./youtube";

interface YoutubeCardProps {
    videoId: string
}

export const YoutubeCard: React.FC<YoutubeCardProps> = ({ videoId, children }) => {
    return (
        <div style={{ display: 'flex', flexFlow: 'row', border: "2px solid #c1c1c1", borderRadius: "8px", marginTop: "20px", overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: "1 0 auto" }}><Youtube id={videoId} height={200} /></div>
            <div style={{ display: 'flex', flexFlow: 'column', padding: "10px 15px" }}>{children}</div>
        </div>
    )
}

interface ImageCardProps {
    videoId?: string
    imageSrc?: string
    mapQuery: string
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, mapQuery, videoId, children }) => {
    return (
        <div style={{ display: 'flex', flexFlow: 'row', border: "2px solid #c1c1c1", borderRadius: "8px", marginTop: "20px", overflow: 'hidden' }}>
            {imageSrc && <div style={{
                display: "flex",
                flex: "1 0 auto",
                height: "250px",
                width: "250px",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}>
                <img src={imageSrc} alt={mapQuery} style={{
                    flexShrink: "0",
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover",
                }} />
            </div>}
            <div style={{ display: 'flex', flexFlow: 'column', padding: "10px 15px", justifyContent: "space-between" }}>
                <div style={{ display: 'flex' }}>{children}</div>
                <div style={{ display: 'flex' }}>
                    {videoId && <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" style={{
                        display: 'flex',
                        textDecoration: "none",
                        color: "#0163e8",
                        marginRight: "20px"
                    }}>
                        <AiFillYoutube size={20} style={{ marginRight: "5px", marginTop: "2px" }} /> Check video
                    </a>}
                    <a href={`https://www.google.com/maps/place/${mapQuery}`} target="_blank" style={{
                        display: 'flex',
                        textDecoration: "none",
                        color: "#0163e8"
                    }}>
                        <MdMap size={20} style={{ marginRight: "5px", marginTop: "2px" }} /> Check on the map
                    </a>
                </div>
            </div>
        </div>
    )
}
