import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { Settings, LanguageCode } from '../../../contexts';
import { settingsConfig } from '../../../configs';
import { Icon } from '../../atoms';
import { OptionsMenu } from '../option-menu';

interface ILanguageDropdown {
  settings: Settings
  saveSettings: (values: Settings) => void
}

export const LanguageDropdown: FC<ILanguageDropdown> = ({ settings, saveSettings }) => {
  const { i18n, t } = useTranslation();
  const { layout, language } = settings;
  const activeLanguage: LanguageCode = language || settingsConfig.defaultLanguage;

  const handleLangItemClick = (lang: LanguageCode) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    saveSettings({ ...settings, language: lang });
  }

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: t('language.english'),
          menuItemProps: {
            sx: { py: 2 },
            selected: activeLanguage === 'en',
            onClick: () => handleLangItemClick('en')
          }
        },
        {
          text: t('language.persian'),
          menuItemProps: {
            sx: { py: 2 },
            selected: activeLanguage === 'fa',
            onClick: () => handleLangItemClick('fa')
          }
        }
      ]}
    />
  )
}
