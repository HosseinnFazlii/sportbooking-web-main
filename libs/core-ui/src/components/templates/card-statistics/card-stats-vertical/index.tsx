import { Box, Card, Typography, CardContent } from '../../../../foundations';
import { CustomAvatar } from '../../../atoms';
import { OptionsMenu } from '../../../molecules';
import { CardStatsVerticalProps } from '../types';

export const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const { title, subtitle, icon, stats, trendNumber, optionsMenuProps, color = 'primary', trend = 'positive', displayOptionsMenu } = props

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', mb: 5.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <CustomAvatar color={trend === 'positive' ? 'success' : 'error'} sx={{ boxShadow: 3, mr: 4 }}>
            {icon}
          </CustomAvatar>
          {displayOptionsMenu && (
            optionsMenuProps ? (
              <OptionsMenu {...optionsMenuProps} />
            ) : (
              <OptionsMenu
                options={['Refresh', 'Share', 'Update']}
                iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
              />
            )
          )}
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{title}</Typography>
        <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', mb: 1.5, alignItems: 'flex-start' }}>
          <Typography variant='h6' sx={{ mr: 2 }}>
            {stats}
          </Typography>
          <Typography
            component='sup'
            variant='caption'
            sx={{ color: trend === 'positive' ? 'success.main' : 'error.main', direction: "rtl" }}
          >
            {trendNumber}
          </Typography>
        </Box>
        <Typography variant='caption'>{subtitle}</Typography>
      </CardContent>
    </Card>
  )
}