import { ReactNode } from 'react';
import { MenuProps, DividerProps, MenuItemProps, IconButtonProps } from '../../../foundations';
import { IconProps } from '@iconify/react';
import { ILink } from '../../atoms';

export type OptionDividerType = {
  divider: boolean
  dividerProps?: DividerProps
  href?: never
  icon?: never
  text?: never
  linkProps?: never
  menuItemProps?: never
}
export type OptionMenuItemType = {
  text: ReactNode
  icon?: ReactNode
  linkProps?: ILink
  href?: ILink['href']
  menuItemProps?: MenuItemProps
  divider?: never
  dividerProps?: never
}

export type OptionType = string | OptionDividerType | OptionMenuItemType

export interface IOptionsMenu {
  icon?: ReactNode;
  options: OptionType[];
  leftAlignMenu?: boolean;
  iconButtonProps?: IconButtonProps;
  iconProps?: Omit<IconProps, 'icon'>;
  menuProps?: Omit<MenuProps, 'open'>;
}
