export interface LoomProps {
    id: string
}

export const Loom = ({ id }: LoomProps) => (
    <div className="relative mt-6 pb-[61.74957118353345%] h-0">
        <iframe
            className="rounded-md absolute top-0 left-0 w-full h-full"
            src={`https://www.loom.com/embed/${id}`}
            title="Loom video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
)
