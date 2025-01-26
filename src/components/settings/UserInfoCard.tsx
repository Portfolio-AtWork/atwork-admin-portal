import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessagesResource } from '@/i18n/resources';

interface UserInfoProps {
  userInfo: {
    nome: string;
    login: string;
    email: string;
  };
}

export const UserInfoCard = ({ userInfo }: UserInfoProps) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{MessagesResource.USER_INFORMATION}</CardTitle>
        <CardDescription>{MessagesResource.REGISTRATION_DATA}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">{MessagesResource.NAME}</label>
          <p className="text-foreground/80">{userInfo.nome}</p>
        </div>
        <div>
          <label className="text-sm font-medium">
            {MessagesResource.LOGIN}
          </label>
          <p className="text-foreground/80">{userInfo.login}</p>
        </div>
        <div>
          <label className="text-sm font-medium">
            {MessagesResource.EMAIL}
          </label>
          <p className="text-foreground/80">{userInfo.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};
