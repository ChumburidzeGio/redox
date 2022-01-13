interface Props {
    id: string
    height?: number
}

export default ({ id, height }: Props) => (
    <>
        <br />
        <iframe
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
