import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InterpreterFrom, interpret, StateValue } from 'xstate';
import { ShortcallCargoMachine } from './create-machine/shortfall-cargo-machine'
import { EvenCargo } from './create-machine/shortfall'
type Shortfallcargo = {
  id: string,
  currentState: StateValue,
  timestab: number
}
const LsHistorycargoShortfall: Shortfallcargo[] = []
@Injectable()
export class AppService {
  trigger({ id, event }: { id: string, event: { type: EvenCargo } }): any {

    const currentMachineState = LsHistorycargoShortfall.filter(x => x.id === id).sort((a, b) => b.timestab - a.timestab)[0]

    if (!currentMachineState) {
      throw new HttpException(
        "can't find current machine status",
        HttpStatus.NOT_FOUND
      )
    }
    console.log("currentMachineState.currentState",currentMachineState.currentState)
    const machine: InterpreterFrom<typeof ShortcallCargoMachine> = interpret(
      ShortcallCargoMachine({
        id: id,
        currentState: currentMachineState.currentState,
      }),
    ).start();

    const nextEvent: EvenCargo[] = machine.getSnapshot().nextEvents

    if (nextEvent.includes(event.type)) {
      machine.send({type:event.type})
      LsHistorycargoShortfall.push({
        id: id,
        currentState: machine.getSnapshot().value,
        timestab: Date.now()
      })
    }
    console.log("machine", nextEvent)
    return {
      id: id,
      nextEvent: nextEvent,
      currentStatus: machine.getSnapshot().value,
    }
  }



  start(): any {
    const create = {
      id: '123456',
      currentState: 'Opened Cargo',
      timestab: Date.now()
    }
    LsHistorycargoShortfall.push(create)
    return create
  }
}

