import { Box, Card, Table, TableRow, TableBody, TableCell, Typography, CardHeader, CardContent, TableContainer } from '@mf-core/core-ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface DataType {
  label: string;
  count: number;
}

interface IBookingsByGroups {
  data: DataType[];
  title?: string;
}

export const BookingsByGroups: FC<IBookingsByGroups> = ({ data, title }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader
        title={title || t('dashboard.bookingsByGroupTitle')}
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ height: "20rem", overflow: "auto" }}>
        <TableContainer>
          <Table>
            <TableBody>
              {data.map((row: DataType) => {
                return (
                  <TableRow
                    key={row.label}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '& .MuiTableCell-root': {
                        py: theme => `${theme.spacing(3.125)} !important`,
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 }
                      },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` }
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.8 } }}
                      >
                        {/* <Icon icon='mdi:circle' fontSize='1.05rem' /> */}
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.label}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.count}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
