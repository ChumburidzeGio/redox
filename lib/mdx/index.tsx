import * as React from "react";
import type {MDXComponents} from "mdx/types";
import { Youtube, YoutubeCard } from "./youtube";
import type { YoutubeProps, YoutubeCardProps } from "./youtube";
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomP } from "./typography";
import { CustomUl, CustomLi } from "./lists";
import { Callout } from "./callout";
import type { CalloutProps } from "./callout";
import { LogEvent } from "./analytics";
import type { LogEventProps } from "./analytics";
import { Image } from "./image";
import type { ImageProps } from "./image";
import { Anchor } from "./anchor";
import type { AnchorProps } from "./anchor";
import { Loom } from "./loom";
import type { LoomProps } from "./loom";
import { Wrapper } from "./wrapper";
import { User } from "./user";
import type { UserProps } from "./user";

export { Wrapper } from "./wrapper";

// Table of components https://mdxjs.com/table-of-components/
// Overwriting components https://mdxjs.com/docs/using-mdx/#components
export const components: MDXComponents = {
  // TODO: fix types
  // @ts-ignore
  h1: CustomH1,
  // @ts-ignore
  h2: CustomH2,
  // @ts-ignore
  h3: CustomH3,
  // @ts-ignore
  h4: CustomH4,
  // @ts-ignore
  p: CustomP,
  // @ts-ignore
  ul: CustomUl,
  // @ts-ignore
  li: CustomLi,
  youtube: (props: YoutubeProps) => <Youtube {...props} />,
  loom: (props: LoomProps) => <Loom {...props} />,
  "youtube-card": (props: YoutubeCardProps) => <YoutubeCard {...props} />,
  callout: (props: CalloutProps) => <Callout {...props} />,
  "log-event": (props: LogEventProps) => <LogEvent {...props} />,
  img: (props: ImageProps) => <Image {...props} />,
  a: (props: AnchorProps) => <Anchor {...props} />,
  // As far as we don't know type of wrapper use spreading to avoid type errors
  wrapper: ({ ...props }) => <Wrapper {...props} />,
  'user': (props: UserProps) => <User {...props} />,
};
