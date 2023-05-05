export enum WhichTimer {
  STUDY,
  BREAK,
  EXAMPHASE,
}

export enum TimerViewState {
  START,
  RUNNING,
  FINISHED,
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
  id: string;
  title: string;
  icon: string;
  archived: false;
}
export interface Reason extends Activity {
  goodReason: boolean;
}

export interface Entry {
  mood?: Mood;
  id?: string;
  timer: Timer;
  studyTimer?: boolean;
}

export interface Study extends Entry {
  reasonIds?: string[];
}

export interface Break extends Entry {
  breakActivityId?: string;
}
