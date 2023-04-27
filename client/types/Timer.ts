export enum ShowPage {
  STUDY,
  BREAK,
  EXAMPHASE,
}

export enum Mood {
  GOOD = "1",
  NEUTRAL = "0",
  BAD = "-1",
}

export interface TimerValues {
  time: number;
  minutes: number;
  seconds: number;
}

export interface ExamPhase {
  id?: string;
  startDate?: number;
  endDate?: number;
  title?: string;
  studyEntries?: Study[];
  breakEntries?: Break[];
  archived?: boolean;
}

export interface Timer {
  startTime: number;
  duration: number;
}

export interface Activity {
  id: number;
  title: string;
  icon: string;
  archived: false;
}
export interface Reason extends Activity {
  goodReason: boolean;
}

export interface Entry {
  mood?: Mood;
  id?: number;
  timer: Timer;
}

export interface Study extends Entry {
  reasonIds?: number[];
}

export interface Break extends Entry {
  breakActivityId?: number;
}
