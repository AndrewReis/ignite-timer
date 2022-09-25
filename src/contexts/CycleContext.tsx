import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useState, useReducer, useEffect } from 'react'
import { cyclesReducer } from '../reducers/cycles'
import { actionAddNewCycle, actionInterruptCurrentCycle, actionMarkCurrentCycleAsFinished } from '../reducers/cycles/actions'

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {cycles: [], activeCycleId: null}, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-v1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {cycles: [], activeCycleId: null}
  })

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle?.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-v1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(actionMarkCurrentCycleAsFinished())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(actionAddNewCycle(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(actionInterruptCurrentCycle())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
