import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TriggerEventDTO } from './dto/trigger-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('trigger')
   trigger(
    @Body() data:any ):Promise<any> {
    return  this.appService.trigger(data);
  }

  @Post('start')
  start():any{
    return this.appService.start();
  }
}
