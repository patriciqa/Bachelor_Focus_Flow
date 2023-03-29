import { isBoolean, isNotEmpty, isNumberString } from 'class-validator';

export class CreateTimerDto {
  startTime: number;
  duration: number;
  isStudyType: boolean;
}
