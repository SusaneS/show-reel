export class Timecode {
  hours: number;
  minutes: number;
  seconds: number;
  frames: number;

  constructor(hours: number, minutes: number, seconds: number, frames: number) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.frames = frames;
  }
}
