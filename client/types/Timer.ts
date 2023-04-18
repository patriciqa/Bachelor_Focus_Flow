export enum PageComponent {
  STUDYTIMER,
  BREAKTIMER,
  STUDYMOOD,
  BREAKMOOD,
  GOODCAUSE,
  BADCAUSE,
  ONBOARDINGEXAMPHASE,
  EXAMPHASEINPUT,

  OVERVIEW,
  SETTINGS,
  SETTINGS_EXAMPHASES,
}
enum Mood {
  GOOD = "1",
  NEUTRAL = "0",
  BAD = "-1",
}
export default Mood;

export interface ExamPhase {
  startDate?: number;
  endDate?: number;
  title?: string;
  studyEntries?: Study[];
  breakEntries?: Break[];
  archived?: boolean;
}
export interface Entry {
  id: number;
  timer: Timer;
  causes?: Cause[];
  mood?: "1" | "0" | "-1";
}

export interface Study {
  id: number;
  timer: Timer;
  causes?: Cause[];
  mood?: "1" | "0" | "-1";
}
export interface Timer {
  startTime: number;
  duration: number;
}

export interface Cause {
  id: number;
  title: string;
  icon: string;
  goodCause: boolean;
  archived: false;
}

// export interface Settings {
//   causes: Cause[];
//   examPhases: ExamPhase[];
//   breakActivities: Activity[];
// }

export interface Activity {
  id: number;
  title: string;
  icon: string;
  archived?: boolean;
}

export interface Break {
  id: number;
  timer: Timer;
  breakActivity?: Activity;
  mood?: Mood;
}
