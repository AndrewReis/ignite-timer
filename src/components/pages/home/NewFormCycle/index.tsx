import { ContainerForm, TaskInput, MinutesAmountInput } from './styles'

export function NewFormCycle() {
  return (
    <ContainerForm>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        type="text"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      minutos
    </ContainerForm>
  )
}
