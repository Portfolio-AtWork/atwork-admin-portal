import { useTranslation } from 'react-i18next';

export const LoadingMessage = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: Error;
}) => {
  const { t } = useTranslation();

  if (isLoading) return <p>{t('loading')}</p>;
  if (error) return <p className="text-red-500">{t('errorLoading')}</p>;

  return null;
};
