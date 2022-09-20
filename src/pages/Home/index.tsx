// dependencies
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

// styles
import {
  Container,
  ContainerForm,
  CountDown,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

/** react hook form
 * function register(name: string) return {input methods}
 * use example -> {...register('task', objConfig)}
 */

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no maximo 60 minutos'),
})

type NewCycleProps = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  // hooks
  const { register, handleSubmit, watch, reset } = useForm<NewCycleProps>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // variables
  const task = watch('task')
  const isSubmitDisabled = !task

  // functions
  function handleCreateNewCycle(data: NewCycleProps) {
    reset()
  }

  // HTML
  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <ContainerForm>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            step={5}
            min={5}
            max={60}
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          minutos
        </ContainerForm>

        <CountDown>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDown>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </Container>
  )
}
