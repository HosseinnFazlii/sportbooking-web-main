import { FC } from 'react'
import { Box, Card, styled, CardMedia, Typography, CardContent, Icon, UserDataType, getBase64FromBuffer, useDateUtils } from '@mf-core/core-ui';
import { ChangePassword } from './ChangePassword';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface IUserProfileHeader {
  user: UserDataType
}
const UserProfileHeader: FC<IUserProfileHeader> = ({ user }) => {
  const { format } = useDateUtils();
  let userPicture = '/images/avatars/1.png';
  if (user && user.picture) {
    if (typeof user.picture === "object" && user.picture.type === "Buffer") {
      userPicture = user.picture.data ? getBase64FromBuffer(user.picture.data) : "";
      userPicture = `data:image/png;base64,${userPicture}`;
    } else if (typeof user.picture === "string") {
      userPicture = user.picture;
    }
  }

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image="/images/pages/back-v1.jpg"
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src={userPicture} alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4 }}>
              {user.roleName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon="mdi:account-group" />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>{user.roleName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:calendar-blank' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
                  تاریخ ثبت کاربر:
                </Typography>
               <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600, direction: "rtl" }}>
                  {format(new Date(user.createdAt), 'yyyy-MM-dd')}
               </Typography>
              </Box>
            </Box>
          </Box>
          <ChangePassword />
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
