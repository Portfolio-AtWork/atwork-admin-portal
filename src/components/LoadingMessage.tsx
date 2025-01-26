import { MessagesResource } from '@/i18n/resources';

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
  if (isLoading) return <p>{loadingMessage || MessagesResource.LOADING}</p>;
  if (error)
    return (
      <p className="text-red-500">
        {errorMessage || MessagesResource.ERROR_LOADING}
      </p>
    );

  return null;
};
