import { Separator } from '@/components/ui/separator';
import { UserInfoCard } from '@/components/settings/UserInfoCard';
import { AppearanceCard } from '@/components/settings/AppearanceCard';
import { LanguageCard } from '@/components/settings/LanguageCard';
import { PasswordChangeCard } from '@/components/settings/PasswordChangeCard';
import { MessagesResource } from '@/i18n/resources';

const Settings = () => {
  const userInfo = {
    nome: localStorage.getItem('userName') || '',
    login: localStorage.getItem('login') || '',
    email: localStorage.getItem('email') || '',
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">{MessagesResource.SETTINGS}</h1>

      <UserInfoCard userInfo={userInfo} />
      <AppearanceCard />
      <LanguageCard />
      <Separator className="my-6" />
      <PasswordChangeCard />
    </div>
  );
};

export default Settings;
