// dependencies
import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

// components
import { Countdown } from '../../components/pages/home/Countdown'
import { NewFormCycle } from '../../components/pages/home/NewFormCycle'

// styles
import { Container, StartCountDownButton, StopCountDownButton } from './styles'
import { CyclesContext } from '../../contexts/CycleContext'

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

// interface & types
type NewCycleProps = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  // use hooks
  const { activeCycle, createNewCycle, interruptCycle } =
    useContext(CyclesContext)
  const newFormCycle = useForm<NewCycleProps>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newFormCycle

  // const & variables
  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleProps) {
    createNewCycle(data)
    reset()
  }

  // HTML
  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newFormCycle}>
          <NewFormCycle />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="submit" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </Container>
  )
}
