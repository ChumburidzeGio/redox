import * as React from 'react'
import { MdOutlineOpenInNew } from "react-icons/md";
import { imagesUrl } from "./image";

export const Services: React.FC = ({ children }) => {
    const count = React.useMemo(() => {
        const count = React.Children.count(children)
        if (count === 3) return 3
        return count > 4 ? 4 : 2
    }, [children]);

    return (
        <div style={{
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: '1fr '.repeat(count),
            gridGap: '30px',
            marginTop: '30px',
            marginBottom: '30px',
            justifyContent: 'space-around'
        }}>
            {children}
        </div>
    )
}

interface Props {
    logo: string
    label: string
    link: string
}

export const ServiceItem: React.FC<Props> = ({ logo, label, link, children }) => (
    <a href={link} target="_blank" style={{
        display: 'flex',
        border: '1px solid #d3d3d3',
        overflow: 'hidden',
        flexFlow: 'column',
        borderRadius: '8px',
        background: '#fff',
        textDecoration: 'none',
        position: 'relative'
    }}>
        <div style={{
            display: 'flex',
            height: '100px',
            padding: '5px',
            overflow: 'hidden',
            justifyContent: 'center'
        }}>
            <img src={imagesUrl(logo)} alt={`${label} service`} style={{
                display: 'block',
                maxHeight: '100px',
                width: 'auto',
                margin: 'auto'
            }} />
        </div>
        <span style={{
            display: 'flex',
            color: '#333',
            fontSize: '18px',
            fontWeight: '700',
            marginTop: '10px',
            padding: '6px 15px'
        }}>{label}</span>
        <span style={{
            display: 'flex',
            color: '#333',
            fontSize: '14px',
            padding: '0 15px 10px'
        }}>{children}</span>
        <MdOutlineOpenInNew size="25" style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: '#333',
        }} />
    </a>
)
