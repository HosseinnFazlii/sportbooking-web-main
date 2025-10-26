import { ReactNode } from 'react';
import { IOptionsMenu } from '../../molecules';
import { ThemeColorType } from '../../../layouts';


export type CardStatsHorizontalProps = {
  title: string
  stats: string
  icon: ReactNode
  color?: ThemeColorType
  trendNumber: string
  trend?: 'positive' | 'negative'
}

export type CardStatsVerticalProps = {
  title: string
  stats: string
  icon: ReactNode
  subtitle: string
  color?: ThemeColorType
  trendNumber: string
  trend?: 'positive' | 'negative'
  optionsMenuProps?: IOptionsMenu;
  displayOptionsMenu?: boolean;
}

export type CardStatsCharacterProps = {
  src: string
  title: string
  stats: string
  chipText: string
  trendNumber: string
  chipColor?: ThemeColorType
  trend?: 'positive' | 'negative'
}
