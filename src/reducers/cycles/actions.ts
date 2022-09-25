import { ActionTypes } from './index'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export function actionAddNewCycle(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function actionMarkCurrentCycleAsFinished() {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
  }
}
  
export function actionInterruptCurrentCycle() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
  