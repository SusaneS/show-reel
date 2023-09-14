import {Definition} from "../models/definition";
import {Standard} from "../models/standard";
import {Timecode} from "../models/timecode";
import {Clip} from "./clip";

export interface Showreel {
  name: string,
  definition: Definition,
  standard: Standard,
  duration: Timecode,
  videoClips: Clip[]
}
