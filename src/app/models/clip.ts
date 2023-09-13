import {Standard} from "./standard";
import {Definition} from "./definition";
import {Timecode} from "./timecode";

export interface Clip {
  name: string,
  description: string,
  standard: Standard,
  definition: Definition,
  start: Timecode,
  end: Timecode
}
