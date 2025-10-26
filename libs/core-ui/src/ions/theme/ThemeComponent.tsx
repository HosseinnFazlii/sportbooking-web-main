// libs/core-ui/src/ions/theme/ThemeComponent.tsx
import { ReactNode } from 'react'
import { Theme, deepmerge, CssBaseline, GlobalStyles, ThemeProvider, createTheme, responsiveFontSizes, ThemeOptions } from '../../foundations';
import { Settings } from '../../contexts';
import { themeConfig } from '../../configs';
import { LayoutDirection } from '../../layouts/components';
import overrides from './overrides';
import typography from './typography';
import { themeOptions } from './ThemeOptions';
import GlobalStyling from './globalStyles';

interface Props {
  settings: Settings;
  children: ReactNode;
  userThemeOptions: () => ThemeOptions;
}

export const ThemeComponent = (props: Props) => {
  // ** Props
  const { settings, children, userThemeOptions } = props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings, userThemeOptions)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Deep Merge Component overrides of core and user
  const mergeComponentOverrides = (theme: Theme, settings: Settings) =>
    deepmerge({ ...overrides(theme, settings) }, userThemeOptions()?.components)

  // ** Deep Merge Typography of core and user
  const mergeTypography = (theme: Theme) => deepmerge(typography(theme), userThemeOptions()?.typography)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, settings) },
    typography: { ...mergeTypography(theme) }
  })

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <LayoutDirection direction={settings.direction || "rtl"}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme)} />
        {children}
      </LayoutDirection>
    </ThemeProvider>
  )
}