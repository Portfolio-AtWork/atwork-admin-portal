import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LanguageToggle } from '@/components/theme/LanguageToggle';
import { MessagesResource } from '@/i18n/resources';

export const LanguageCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{MessagesResource.LANGUAGE}</CardTitle>
        <CardDescription>{MessagesResource.CHANGE_LANGUAGE}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{MessagesResource.LANGUAGE}</h3>
            <p className="text-sm text-muted-foreground">
              {MessagesResource.CHOOSE_LANGUAGE}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </CardContent>
    </Card>
  );
};
