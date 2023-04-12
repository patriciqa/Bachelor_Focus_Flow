export interface ExamPhase {
  startDate: number;
  endDate: number;
  title: string;
  studyEntries: Study[];
  breakEntries: Break[];
}

export interface Timer {
  startTime: number;
  duration: number;
  endTime: number; //??
}

//Break
export interface Break {
  id: number;
  timer: Timer;
  mood: "1" | "0" | "-1";
  activity: BreakEntry;
}

export interface BreakEntry {
  breakActivities: BreakActivityStatistic[];
}

export interface BreakActivityStatistic {
  title: Activity;
  wentWell: "1" | "0" | "-1";
}

export interface Activity {
  title: string;
  icon: string;
  statistic: number;
}

//Study
export interface Study {
  id: number;
  timer: Timer;
  mood: "1" | "0" | "-1";
  cause: Causes;
}

export interface Causes {
  causes: CauseEntry[];
}

export interface CauseEntry {
  cause: Cause;
  gooodCause: "1" | "0" | "-1";
}

export interface Cause {
  title: string;
  icon: string;
  statistic: number;
}
