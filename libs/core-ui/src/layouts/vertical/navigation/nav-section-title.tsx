import { Typography, TypographyProps, ListSubheader as MuiListSubheader, ListSubheaderProps, styled, useTheme, Divider } from '../../../foundations';
import { IVerticalNavSectionTitle } from '../../types';
import { Translation, CanViewNavSectionTitle } from '../../../components';
import { FC } from 'react';
import { hexToRGBA } from '@mf-core/core-ui';

// ** Styled Components
const ListSubheader = styled((props: ListSubheaderProps) => <MuiListSubheader component='li' {...props} />)(
  ({ theme }) => ({
    lineHeight: 1,
    display: 'flex',
    position: 'static',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent'
  })
)

const TypographyHeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.75rem',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  fontWeight: theme.typography.fontWeightMedium
}))

export const VerticalNavSectionTitle: FC<IVerticalNavSectionTitle> = ({ item, navHover, settings, collapsedNavWidth, navigationBorderWidth }) => {
  const theme = useTheme()
  const { mode, navCollapsed } = settings

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        '& .MuiTypography-root': {
          color: hexToRGBA(theme.palette.customColors.dark, 0.37)
        },
        '& .MuiDivider-root:before, & .MuiDivider-root:after, & hr': {
          borderColor: hexToRGBA(theme.palette.customColors.dark, navCollapsed && !navHover ? 0.3 : 0.12)
        }
      }
    } else {
      return {
        '& .MuiTypography-root': {
          color: 'text.disabled'
        },
        '& .MuiDivider-root:before, & .MuiDivider-root:after, & hr': {
          borderColor: hexToRGBA(theme.palette.customColors.main, navCollapsed && !navHover ? 0.3 : 0.12)
        }
      }
    }
  }

  return (
    <CanViewNavSectionTitle navTitle={item}>
      <ListSubheader
        className='nav-section-title'
        sx={{
          ...conditionalColors(),
          ...(navCollapsed && !navHover
            ? {
              py: 3.5,
              pr: (collapsedNavWidth - navigationBorderWidth - 24) / 8 - 1,
              pl: (collapsedNavWidth - navigationBorderWidth - 24) / 8 + 0.25
            }
            : { px: 0, py: 1.75 })
        }}
      >
        <Divider
          textAlign='left'
          sx={{
            m: 0,
            lineHeight: 'normal',
            ...(navCollapsed && !navHover
              ? { width: 22 }
              : {
                width: '100%',
                textTransform: 'uppercase',
                '&:before, &:after': { top: 7, transform: 'none' },
                '& .MuiDivider-wrapper': { px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px' }
              })
          }}
        >
          {navCollapsed && !navHover ? null : (
            <TypographyHeaderText noWrap>
              <Translation text={item.sectionTitle} />
            </TypographyHeaderText>
          )}
        </Divider>
      </ListSubheader>
    </CanViewNavSectionTitle>
  )
}