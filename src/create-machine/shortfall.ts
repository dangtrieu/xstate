import { StateValue } from 'xstate';

export type ShortfallCase = {
  id: string;
  currentState: StateValue;
  timestamp: number;
};


export type EventCargoType = { type: EvenCargo };

export enum EvenCargo {
  Register = 'register',
  Apply = 'apply',
  NotApply = 'not apply',
}
