export enum WhichTimer {
  STUDY,
  BREAK,
  EXAMPHASE,
}

export enum TimerViewState {
  START,
  RUNNING,
  FINISHED,
  EXTEND,
}

export enum Mood {
  GOOD = "good",
  RATHER_GOOD = "rather good",
  RATHER_BAD = "rather bad",
  BAD = "bad",
}

export type PickedDate = {
  from: number;
  to: number;
};
export interface TimerValues {
  time: number;
  minutes: number;
  seconds: number;
}

export interface ExamPhase {
  id?: number;
  startDate?: number;
  endDate?: number;
  title?: string;
  studyEntries?: Study[];
  breakEntries?: Break[];
}

export interface Timer {
  startTime: number;
  duration: number;
}

export interface Activity {
  id?: number;
  title: string;
  icon: string;
  archived: boolean;
}
export interface Reason extends Activity {
  goodReason: boolean | null;
}

export interface Entry {
  mood?: Mood;
  id?: number;
  timer: Timer;
  studyTimer?: boolean;
}

export interface Study extends Entry {
  reasonIds?: number[] | null;
}

export interface Break extends Entry {
  ratherGood: any;
  good: any;
  breakActivityId?: number | null;
}
