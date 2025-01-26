import { useTranslation } from 'react-i18next';

type LoadingMessageProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error: Error;
  errorMessage?: string;
};

export const LoadingMessage = ({
  isLoading,
  loadingMessage,
  error,
  errorMessage,
}: LoadingMessageProps) => {
  const { t } = useTranslation();

  if (isLoading) return <p>{loadingMessage || t('loading')}</p>;
  if (error)
    return <p className="text-red-500">{errorMessage || t('errorLoading')}</p>;

  return null;
};
