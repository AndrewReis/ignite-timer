import { useContext } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CycleContext'
import { Container, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <Container>
      <h1>Meu Historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(new Date(cycle.startDate), {addSuffix: true, locale: ptBR})}</td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluido</Status>
                  )}
                  {cycle.interruptDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptDate && (
                    <Status statusColor="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
