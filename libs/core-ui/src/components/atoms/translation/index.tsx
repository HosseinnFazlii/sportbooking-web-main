import { useTranslation } from 'react-i18next';

interface Props {
  text: string
}

export const Translation = ({ text }: Props) => {
  // ** Hook
  const { t } = useTranslation()

  return `${t(text)}`
}