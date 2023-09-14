import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowreelComponent} from './showreel.component';
import {FormsModule} from "@angular/forms";
import {Showreel} from "./showreel";
import {Definition} from "../models/definition";
import {Standard} from "../models/standard";
import {Clip} from "./clip";
import {Timecode} from "../models/timecode";
import {By} from "@angular/platform-browser";

describe('ShowreelComponent', () => {
  let component: ShowreelComponent;
  let fixture: ComponentFixture<ShowreelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowreelComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ShowreelComponent);
    component = fixture.componentInstance;
    component.availableClips = videoClips();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('matching standard and definition', () => {
    beforeEach(() => {
      component.showreel = {
        name: 'Test',
        definition: Definition.SD,
        standard: Standard.NTSC,
        duration: new Timecode(0,0, 0, 0),
        videoClips: []
      } as Showreel;
      fixture.detectChanges();
    });

    it('it should add a video clip to showreel and update duration', () => {
      const select = fixture.debugElement.query(By.css('select')).nativeElement;
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.showreel.videoClips.length).toBe(1);
      expect(component.showreel.duration.seconds).toBe(15);
    });
  });

  describe('not matching standard and definition', () => {
    beforeEach(() => {
      component.showreel = {
        name: 'Test',
        definition: Definition.SD,
        standard: Standard.NTSC,
        duration: new Timecode(0,0, 0, 0),
        videoClips: []
      } as Showreel;
      fixture.detectChanges();
    });

    it('it should not add a video clip to showreel', () => {
      const select = fixture.debugElement.query(By.css('select')).nativeElement;
      select.value = select.options[1].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.showreel.videoClips.length).toBe(0);
      expect(component.isSelectedClipValid).toBe(false);
    });
  });

  function videoClips(): Clip[] {
    return [
      {
        name: 'Clip1',
        standard: Standard.PAL,
        definition: Definition.SD,
        start: new Timecode(0, 0, 0, 0),
        end: new Timecode(0, 1, 20, 10)
      } as Clip,
      {
        name: 'Clip2',
        standard: Standard.PAL,
        definition: Definition.HD,
        start: new Timecode(0, 0, 0, 0),
        end: new Timecode(0, 1, 30, 10)
      } as Clip,
      {
        name: 'Clip3',
        standard: Standard.NTSC,
        definition: Definition.SD,
        start: new Timecode(0, 0, 0, 0),
        end: new Timecode(0, 0, 15, 10)
      } as Clip
    ]
  }
});
