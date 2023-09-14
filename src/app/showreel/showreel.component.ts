import {Component} from '@angular/core';
import {Showreel} from "./showreel";
import {Timecode} from "../models/timecode";
import {getVideos} from "../video-clips";
import {Clip} from "./clip";
import {Standard} from "../models/standard";

@Component({
  selector: 'app-showreel',
  templateUrl: './showreel.component.html',
  styleUrls: ['./showreel.component.css']
})
export class ShowreelComponent {
    availableClips = getVideos();
    selectedClip: Clip = {} as Clip;
    isSelectedClipValid = true;
    showreel = {
      duration: new Timecode(0, 0, 0, 0),
      videoClips: [] as Clip[]
    } as Showreel;

    private readonly NTSC_FRAMES = 30;
    private readonly PAL_FRAMES = 25;

  selectNewVideo() {
    this.isSelectedClipValid = true;
    if (!this.selectedClip) {
      return;
    }
    if (!this.showreel.standard || this.showreel.videoClips.length === 0) {
      this.showreel.standard = this.selectedClip.standard;
      this.showreel.definition = this.selectedClip.definition;
    } else {
      if (this.selectedClip.standard !== this.showreel.standard ||
        this.selectedClip.definition !== this.showreel.definition) {
        this.isSelectedClipValid = false;
        return;
      }
    }
    this.showreel.videoClips.push(this.selectedClip);
    this.calculateDurationWhenVideoAdded();
  }

  removeVideo(clip: Clip) {
    const index = this.showreel.videoClips.findIndex(c => c.name === clip.name);
    this.showreel.videoClips.splice(index, 1);
    this.calculateDurationWhenVideoRemoved(clip);
  }

  private calculateDurationWhenVideoAdded() {
    this.showreel.duration.addOn(this.selectedClip.end);
    this.showreel.duration.subtract(this.selectedClip.start);
    const frames = this.showreel.duration.frames;
    const frameDif = this.showreel.standard === Standard.NTSC ? frames/this.NTSC_FRAMES : frames/this.PAL_FRAMES;
    if (frameDif >= 1) {
      this.showreel.duration.seconds += Math.floor(frameDif);
      this.showreel.duration.frames = frames - (this.showreel.standard === Standard.NTSC ? this.NTSC_FRAMES : this.PAL_FRAMES);
    }
  }

  private calculateDurationWhenVideoRemoved(clip: Clip) {
    this.showreel.duration.subtract(clip.end);
    this.showreel.duration.addOn(clip.start);
    const frames = this.showreel.duration.frames;
    if (frames < 0) {
      this.showreel.duration.frames = frames + (this.showreel.standard === Standard.NTSC ? this.NTSC_FRAMES : this.PAL_FRAMES);
      this.showreel.duration.seconds -= 1;
    }
  }
}
