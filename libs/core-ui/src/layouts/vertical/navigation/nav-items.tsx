import { INavLink, INavGroup, INavSectionTitle, IVerticalNavItems } from '../../types';
import VerticalNavLink from './nav-link'
import { VerticalNavGroup } from './nav-group'
import { VerticalNavSectionTitle } from './nav-section-title'
import { FC } from 'react';

const resolveNavItemComponent = (item: INavGroup | INavLink | INavSectionTitle) => {
  if ((item as INavSectionTitle).sectionTitle) return VerticalNavSectionTitle;
  if ((item as INavGroup).children) return VerticalNavGroup;

  return VerticalNavLink;
}

export const VerticalNavItems: FC<IVerticalNavItems> = (props) => {
  const { verticalNavItems } = props;

  if (!verticalNavItems)
    return null;

  const renderMenuItems = verticalNavItems.map((item: INavGroup | INavLink | INavSectionTitle, index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TagName: any = resolveNavItemComponent(item);
    // if ((item as INavSectionTitle).sectionTitle) {
    //   return <VerticalNavSectionTitle {...props} key={index} item={(item as INavSectionTitle)} />;
    // }

    // if ((item as INavGroup).children) {
    //   return <VerticalNavGroup {...props} key={index} item={(item as INavGroup)} />;
    // }

    // return <VerticalNavLink {...props} parent={!!props.parent} key={index} item={(item as INavLink)} />;
    return <TagName {...props} key={index} item={item} />;

  });
  return renderMenuItems;
}
