import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { UserInfoCard } from '@/components/settings/UserInfoCard';
import { AppearanceCard } from '@/components/settings/AppearanceCard';
import { LanguageCard } from '@/components/settings/LanguageCard';
import { PasswordChangeCard } from '@/components/settings/PasswordChangeCard';

const Settings = () => {
  const { t } = useTranslation();

  const userInfo = {
    nome: localStorage.getItem('userName') || '',
    login: localStorage.getItem('login') || '',
    email: localStorage.getItem('email') || '',
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('settings')}</h1>

      <UserInfoCard userInfo={userInfo} />
      <AppearanceCard />
      <LanguageCard />
      <Separator className="my-6" />
      <PasswordChangeCard />
    </div>
  );
};

export default Settings;
