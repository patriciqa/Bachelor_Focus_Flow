import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTimerDto } from 'src/dtos/CreateTimer.dto';

import { TimerService } from './timer.service';

@Controller('timers')
export class TimerController {
  constructor(private readonly timersService: TimerService) {}

  @Get()
  async getAllTimestamps() {
    // return this.timersService.getTimeslots();
    return this.timersService.findAll();
  }

  @Post()
  async startTimer(@Body() createTimerDto: CreateTimerDto) {
    createTimerDto.startTime = Date.now();
    this.timersService.create(createTimerDto);
    // this.timersService.createTimeSlot(createTimerDto);
  }
}
