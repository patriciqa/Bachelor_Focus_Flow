import { isBoolean, isNotEmpty, isNumberString } from 'class-validator';

export class CreateTimerDto {
  startTime: number;
  duration: number;
  studyType: boolean;
}
