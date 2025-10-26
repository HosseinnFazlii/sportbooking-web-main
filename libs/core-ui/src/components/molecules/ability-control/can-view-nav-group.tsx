import { FC, ReactNode, useContext } from 'react'
import { AbilityContext } from '../../../contexts';
import { INavGroup, INavLink } from '../../../layouts';

interface ICanViewNavGroup {
  navGroup?: INavGroup
  children: ReactNode
}

export const CanViewNavGroup: FC<ICanViewNavGroup> = ({ children, navGroup }) => {
  const ability = useContext(AbilityContext);

  const canViewMenuGroup = (item: INavGroup) => {
    const hasAnyVisibleChild =
      item.children && item.children.some((i: INavLink) => ability && ability.can(i.action, i.subject))

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
  }

  const hasAbility = (navGroup && canViewMenuGroup(navGroup)) || true;

  return hasAbility ? children : null;
}