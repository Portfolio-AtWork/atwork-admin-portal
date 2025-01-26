import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MessagesResource } from '@/i18n/resources';

export const AppearanceCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{MessagesResource.APPEARANCE}</CardTitle>
        <CardDescription>{MessagesResource.CUSTOMIZE_THEME}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{MessagesResource.THEME}</h3>
            <p className="text-sm text-muted-foreground">
              {MessagesResource.CHOOSE_THEME}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
};
