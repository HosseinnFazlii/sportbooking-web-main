import { FC } from "react";
import { RepeaterProps } from './types'

export const Repeater: FC<RepeaterProps> = (props) => {
  const { count, tag, children } = props;
  const Tag = tag || 'div';
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  return (<Tag {...props}>{items}</Tag>);
}