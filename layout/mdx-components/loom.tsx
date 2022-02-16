export interface LoomProps {
    id: string
}

export const Loom = ({ id }: LoomProps) => (
    <div style={{
        position: 'relative',
        marginTop: '20px',
        paddingBottom: '61.74957118353345%',
        height: '0'
    }}>
        <iframe
            src={`https://www.loom.com/embed/${id}`}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }}
            title="Loom video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
)
