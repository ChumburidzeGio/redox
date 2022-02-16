import districts from "./districts";
import { Badge } from "elements";
import type { BadgeProps } from "elements";
import {ImageCard} from "../";

const tagToColor: Record<string, BadgeProps['color']> = {
    safe: 'green',
    unsafe: 'red',
}

const DistrictsExplorer = () => districts.map(district => (
    <ImageCard imageSrc={district.imageSrc} videoId={district.videoId} mapQuery={district.id}>
        <div className="text-lg font-bold">{district.title}</div>
        <div className="flex flex-row mb-3 mt-1 flex-wrap">
            {district.tags.map(tag => (
                <div className="mr-1">
                    <Badge color={tagToColor[tag]}>{tag}</Badge>
                </div>
            ))}
        </div>
        {district.description}
    </ImageCard>
))

export default DistrictsExplorer
