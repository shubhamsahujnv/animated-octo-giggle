import React from "react";
import { Composition, registerRoot } from "remotion";
import { Teaser } from "./Teaser";
import { Cover } from "./Cover";
import { DURATION, FPS } from "./timing";

/** One timeline, two frames: the 9:16 reel and the 4:5 feed post. */
const Root: React.FC = () => (
  <>
    <Composition id="Reel" component={Teaser} defaultProps={{ fmt: "reel" as const }} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
    <Composition id="Post" component={Teaser} defaultProps={{ fmt: "post" as const }} durationInFrames={DURATION} fps={FPS} width={1080} height={1350} />
    <Composition id="CoverReel" component={Cover} defaultProps={{ fmt: "reel" as const }} durationInFrames={1} fps={FPS} width={1080} height={1920} />
    <Composition id="CoverPost" component={Cover} defaultProps={{ fmt: "post" as const }} durationInFrames={1} fps={FPS} width={1080} height={1350} />
  </>
);

registerRoot(Root);
