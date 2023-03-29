import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';
import { TimerSchema } from './timer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Timer', schema: TimerSchema }]),
  ],
  controllers: [TimerController],
  providers: [TimerService],
})
export class TimerModule {}