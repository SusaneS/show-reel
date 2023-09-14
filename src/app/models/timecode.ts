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

  addOn(timeCode: Timecode) {
    this.hours += timeCode.hours;
    this.minutes += timeCode.minutes;
    this.seconds += timeCode.seconds;
  }

  subtract(timeCode: Timecode) {
    this.hours -= timeCode.hours;
    this.minutes -= timeCode.minutes;
    this.seconds -= timeCode.seconds;
  }

  static duration(tc1: Timecode, tc2: Timecode): Timecode {
    const hours = tc1.hours - tc2.hours;
    const minutes = tc1.minutes - tc2.minutes;
    const seconds = tc1.seconds - tc2.seconds;
    return new Timecode(hours, minutes, seconds, tc1.frames);
  }

  private numberToString(num: number) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2});
  }
}
