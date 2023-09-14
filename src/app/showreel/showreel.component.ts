import {Component} from '@angular/core';
import {Showreel} from "../models/showreel";
import {Timecode} from "../models/timecode";
import {getVideos} from "../video-clips";
import {Clip} from "../models/clip";

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

  selectNewVideo(){
    this.isSelectedClipValid = true;
    if (!this.selectedClip) {
      return;
    }
    if (!this.showreel.standard) {
      this.showreel.standard = this.selectedClip.standard;
      this.showreel.definition = this.selectedClip.definition;
    } else {
      if (this.selectedClip.standard !== this.showreel.standard ||
        this.selectedClip.definition !== this.showreel.definition) {
        this.isSelectedClipValid = false;
        return;
      }
    }
    this.showreel.duration.addOn(Timecode.duration(this.selectedClip.end, this.selectedClip.start));
    this.showreel.videoClips.push(this.selectedClip);
  }
}
