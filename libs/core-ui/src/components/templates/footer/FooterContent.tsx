import { FC } from 'react';
import { Box, Theme, Typography, useMediaQuery, useTheme } from '../../../foundations';
import { Link, RismunLogo } from '../../atoms';

interface IFooterContent {
  version: string;
}

export const FooterContent: FC<IFooterContent> = ({ version }) => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="caption">تمام حقوق برای شرکت ریسمان محفوظ است</Typography>
        <Typography variant="caption">{`نسخه ${version}`}</Typography>
      </Box>
      {!hidden && (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
          <Typography variant="caption" sx={{ margin: "0px 10px" }}>طراحی و پیاده سازی</Typography>
          <Link href="http://www.rismun.ir" target="_blank" rel="noreferrer" style={{ height: "36px" }}>
            {/* <img src="/img/logo-rismun.svg" alt="ریسمان" style={{ height: "100%", display: "block" }} /> */}
            <RismunLogo primaryColor={theme.palette.primary.main} textColor={theme.typography.caption.color} width={90} height={36} />

          </Link>
        </Box>
      )}
    </Box>
  )
}
