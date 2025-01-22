import { useTranslation } from "react-i18next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

export const AppearanceCard = () => {
  const { t } = useTranslation()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("appearance")}</CardTitle>
        <CardDescription>{t("customizeTheme")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{t("theme")}</h3>
            <p className="text-sm text-muted-foreground">{t("chooseTheme")}</p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  )
}