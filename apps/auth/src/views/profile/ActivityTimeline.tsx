import { Icon, styled, Box, Card, TimelineDot, CardHeader, Typography, CardContent, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector, Timeline as MuiTimeline, TimelineProps, useDateUtils } from '@mf-core/core-ui';
import { useActivityData } from '@mf-core/sportbooking-core';

const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  const activities = useActivityData();
  const { format } = useDateUtils();
  if (!activities || !activities.items || activities.items.length === 0)
    return null;
  return (
    <Card>
      <CardHeader
        title='فعالیت‌های اخیر'
        sx={{ '& .MuiCardHeader-avatar': { mr: 2.5 } }}
        avatar={<Icon icon='mdi:chart-timeline-variant' />}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
      />
      <CardContent sx={{ height: "37rem", overflow: "auto" }}>
        <Timeline sx={{ my: 0, py: 0 }}>
          {activities.items.map((activity, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineDot color={activity.title === "ورود به پنل" || activity.title === "ورود ناموفق" ? 'error' : 'info'} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2.75)} !important` }}>
                <Box
                  sx={{
                    mb: 2.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ mr: 2, fontWeight: 600 }} color={activity.title === "ورود ناموفق" ? "error" : undefined}>{activity.title}</Typography>
                 <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {format(new Date(activity.date), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  {activity.subtitle}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
