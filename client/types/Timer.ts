import { ExamPhase } from "@/Config";

export enum PageComponent {
  STUDYTIMER,
  BREAKTIMER,
  STUDYMOOD,
  BREAKMOOD,
  GOODCAUSE,
  BADCAUSE,
}
enum Mood {
  GOOD = "1",
  NEUTRAL = "0",
  BAD = "-1",
}
export default Mood;
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
  title: string;
  icon: string;
  statistic: number;
  goodCause: boolean;
  archived: false;
}

export interface Settings {
  causes: Cause[];
  examPhases: ExamPhase[];
  breakActivities: Activity[];
}

export interface Activity {
  title: string;
  icon: string;
  statistic: number;
  archived?: boolean;
}

export interface Break {
  id: number;
  timer: Timer;
  breakActivity?: BreakEntry;
}

export interface BreakEntry {
  activity?: Activity;
  mood?: Mood;
}
