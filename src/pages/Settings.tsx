import { PageHeader } from '@/components/layout/PageHeader';
import { AppearanceCard } from '@/components/pages/settings/AppearanceCard';
import { LanguageCard } from '@/components/pages/settings/LanguageCard';
import { PasswordChangeCard } from '@/components/pages/settings/PasswordChangeCard';
import { UserInfoCard } from '@/components/pages/settings/UserInfoCard';
import { Separator } from '@/components/ui/separator';
import { MessagesResource } from '@/i18n/resources';

const Settings = () => {
  const userInfo = {
    nome: localStorage.getItem('userName') || '',
    login: localStorage.getItem('login') || '',
    email: localStorage.getItem('email') || '',
  };

  return (
    <>
      <PageHeader title={MessagesResource.SETTINGS} />
      <UserInfoCard userInfo={userInfo} />
      <AppearanceCard />
      <LanguageCard />
      <Separator className="my-6" />
      <PasswordChangeCard />
    </>
  );
};

export default Settings;
