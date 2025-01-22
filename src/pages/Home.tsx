import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{t('welcomeMessage')}</h2>
      <p className="text-muted-foreground">{t('selectOption')}</p>
    </>
  );
};

export default Home;