import { createMachine } from 'xstate';
import { EventCargoType } from './shortfall';

export const ShortcallCargoMachine = ({ id, currentState }: {
    id: string;
    currentState: any;
  }) =>
  createMachine({
    id,
    initial: currentState || "Opened Cargo",
    states: {
      "Opened Cargo": {
        on: {
          register: {
            target: "Register Cargo",
          }, 
        },
      },
      "Register Cargo": {
        on: {
          apply: {
            target: "Applied Cargo",
          },
          "not apply": {
            target: "Not Applied Cargo",
          },
        },
      },
      "Applied Cargo": {
        type: "final",
      },
      "Not Applied Cargo": {
        type: "final",
      },
    },
    schema: {
      events: {} as EventCargoType,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  });








