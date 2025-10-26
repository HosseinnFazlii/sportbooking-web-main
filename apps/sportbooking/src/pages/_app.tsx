import { AdapterDateFns, AdapterDateFnsJalali, LocalizationProvider } from '@mf-core/core-ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider key="LocalizationProvider" dateAdapter={AdapterDateFnsJalali}>
      <Component {...pageProps} />
    </LocalizationProvider>
  )
}
