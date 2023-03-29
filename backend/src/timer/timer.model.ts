import * as mongoose from 'mongoose';

export const TimerSchema = new mongoose.Schema({
  startTime: { type: Number, required: false },
  duration: { type: Number, required: false },
  studyType: { type: Boolean, required: false },
});

export interface Timer extends mongoose.Document {
  id: string;
  startTime: number;
  duration: number;
  studyType: boolean;
}
