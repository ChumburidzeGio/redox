import { Youtube, YoutubeCard } from './youtube'
import type { YoutubeProps, YoutubeCardProps } from './youtube'
import { CustomH1, CustomH2, CustomH3, CustomP} from './typography'
import {Callout} from "./callout";
import type { CalloutProps } from './callout'

export const components = {
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    p: CustomP,
    youtube: (props: YoutubeProps) => <Youtube {...props} />,
    'youtube-card': (props: YoutubeCardProps) => <YoutubeCard {...props} />,
    callout: (props: CalloutProps) => <Callout {...props} />,
}
