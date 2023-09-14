import {Standard} from "../models/standard";
import {Definition} from "../models/definition";
import {Timecode} from "../models/timecode";

export interface Clip {
  name: string,
  description: string,
  standard: Standard,
  definition: Definition,
  start: Timecode,
  end: Timecode
}
