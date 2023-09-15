// This class could've been implemented way better probably but due to lack of time
// didn't have so much room for checking requirements and got a bit confused with frames
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
    this.frames += timeCode.frames;
    if (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes += 1;
    }

    if (this.minutes >= 60) {
      this.minutes -= 60;
      this.hours += 1;
    }
  }

  subtract(timeCode: Timecode) {
    this.hours -= timeCode.hours;
    this.minutes -= timeCode.minutes;
    this.seconds -= timeCode.seconds;
    this.frames -= timeCode.frames;
    if (this.seconds < 0) {
      this.seconds += 60;
      this.minutes -= 1;
    }
    if (this.minutes < 0) {
      this.minutes += 60;
      this.hours -= 1;
    }
  }

  private numberToString(num: number) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2});
  }
}
