import { produce } from 'immer'

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export enum ActionTypes {
 ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
 INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
 MARK_CURRENT_CYCLE_AS_FINESHED = 'MARK_CURRENT_CYCLE_AS_FINESHED'
}

export function cyclesReducer(state: CyclesState, action: any) {
    if (action.type === ActionTypes.ADD_NEW_CYCLE) {
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id
      // }
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }

    if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
      if (currentCycleIndex === -1) {
        return state
      }
      return produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })
    }

    if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINESHED) {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null
      // }

      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
      if (currentCycleIndex === -1) {
        return state
      }
      return produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }

    return state
  }