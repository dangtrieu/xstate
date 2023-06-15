import { EvenCargo } from '../create-machine/shortfall';
import { IsNotEmpty } from 'class-validator';

export class TriggerEventDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  event: EvenCargo;
}
