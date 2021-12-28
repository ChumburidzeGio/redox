interface Props {
    id: string
}

export default ({ id }: Props) => (
    <>
        <br />
        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            width="100%"
            height="500px"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </>
)
