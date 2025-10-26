import { ChangeEvent, FC, ReactNode } from 'react';
import { Box, Grid, Radio, Typography, GridProps, useTheme } from '../../../foundations';
import { Icon, IconifyIcon } from '../icon';
import { ThemeColorType } from '../../../layouts';

export type IRadioIconData = {
  value: number;
  title?: ReactNode;
  content?: ReactNode;
  isSelected?: boolean;
  icon?: string | IconifyIcon;
}
export type IRadioIcon = {
  name: string;
  selected: number;
  color?: ThemeColorType;
  gridProps: GridProps;
  data: IRadioIconData;
  disabled?: boolean;
  // iconProps?: Omit<IconProps, 'icon'>;
  handleChange: (newValue: number | ChangeEvent<HTMLInputElement>) => void;
}

// export interface IconType {
//   icon?: string;
//   iconProps: Omit<IconProps, 'icon'>;
// }

export const RadioIcon: FC<IRadioIcon> = ({ data, name, selected, gridProps, handleChange, color, disabled }) => {
  const { title, value, content } = data;
  const theme = useTheme();

  const renderComponent = () => {
    return (
      <Grid item {...gridProps}>
        <Box
          onClick={() => handleChange(value)}
          sx={{
            p: 4,
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            border: theme => `1px solid ${theme.palette.divider}`,
            ...(selected === value
              ? { borderColor: `${color || 'primary'}.main` }
              : { '&:hover': { borderColor: theme => `${theme.palette.customColors.main}40` } })
          }}
        >
          {data.icon ? <Icon icon={data.icon} fontSize='2rem' style={{ marginBottom: 4 }} color={theme.palette.text.secondary} /> : null}
          {title ? (
            typeof title === 'string' ? (
              <Typography sx={{ fontWeight: 500, ...(content ? { mb: 1 } : { my: 'auto' }) }}>{title}</Typography>
            ) : (
              title
            )
          ) : null}
          {content ? (
            typeof content === 'string' ? (
              <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
                {content}
              </Typography>
            ) : (
              content
            )
          ) : null}
          <Radio
            name={name}
            size='small'
            color={color || 'primary'}
            value={value}
            onChange={handleChange}
            checked={selected === value}
            sx={{ mb: -2, ...(!data.icon && !title && !content && { mt: -2 }) }}
            disabled={disabled}
          />
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}