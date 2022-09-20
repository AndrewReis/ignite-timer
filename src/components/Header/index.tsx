// dependencies
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

// styles & images
import { Container } from './styles'
import logoIgnite from '../../assets/logo-ignite.svg'

export function Header() {
  return (
    <Container>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Container>
  )
}
