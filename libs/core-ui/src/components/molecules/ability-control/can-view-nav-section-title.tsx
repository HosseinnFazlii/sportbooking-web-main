import { FC, ReactNode, useContext } from 'react'
import { AbilityContext } from '../../../contexts'
import { INavSectionTitle } from '../../../layouts'

interface ICanViewNavSectionTitle {
  children: ReactNode
  navTitle?: INavSectionTitle
}

export const CanViewNavSectionTitle: FC<ICanViewNavSectionTitle> = ({ children, navTitle }) => {
  const ability = useContext(AbilityContext);

  const hasAbility = (ability && ability.can(navTitle?.action, navTitle?.subject)) || true;
  return hasAbility ? children : null;
}