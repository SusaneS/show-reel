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

  format() {
    return `${this.numberToString(this.hours)}:${this.numberToString(this.minutes)}` +
    `:${this.numberToString(this.seconds)}:${this.numberToString(this.frames)}`;
  }

  private numberToString(num: number) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2});
  }
}
