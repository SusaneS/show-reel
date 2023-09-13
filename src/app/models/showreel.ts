import {Definition} from "./definition";
import {Standard} from "./standard";
import {Timecode} from "./timecode";
import {Clip} from "./clip";

export interface Showreel {
  name: string,
  definition: Definition,
  standard: Standard,
  duration: Timecode,
  videoClips: Clip[]
}
