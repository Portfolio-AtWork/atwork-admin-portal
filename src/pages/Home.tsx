import { MessagesResource } from '@/i18n/resources';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {MessagesResource.WELCOME_MESSAGE}
      </h2>
      <p className="text-muted-foreground">{t('SELECT_AN_OPTION')}</p>
    </>
  );
};

export default Home;
