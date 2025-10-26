import { FC, ReactNode, useContext } from 'react'
import { AbilityContext } from '../../../contexts';
import { INavLink } from '../../../layouts'

interface ICanViewNavLink {
  navLink?: INavLink
  children: ReactNode
}

export const CanViewNavLink: FC<ICanViewNavLink> = ({ children, navLink }) => {
  const ability = useContext(AbilityContext)

  const hasAbility = (ability && ability.can(navLink?.action, navLink?.subject)) || true;

  return hasAbility ? children : null;
}