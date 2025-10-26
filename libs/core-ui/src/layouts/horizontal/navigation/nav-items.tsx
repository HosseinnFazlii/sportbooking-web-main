// ** Types
import { INavLink, INavGroup, HorizontalNavItemsType, Settings } from '../../types'
import { HorizontalNavLink } from './nav-link'
import { HorizontalNavGroup } from './nav-group'
import { FC } from 'react'

interface IHorizontalNavItems {
  hasParent?: boolean;
  horizontalNavItems?: HorizontalNavItemsType;
  settings: Settings;
}
const resolveComponent = (item: INavGroup | INavLink) => {
  if ((item as INavGroup).children)
    return HorizontalNavGroup;

  return HorizontalNavLink
}

export const HorizontalNavItems: FC<IHorizontalNavItems> = (props) => {
  const RenderMenuItems = props.horizontalNavItems?.map((item: any, index: number) => {
    const TagName = resolveComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return RenderMenuItems;
}

export default HorizontalNavItems
