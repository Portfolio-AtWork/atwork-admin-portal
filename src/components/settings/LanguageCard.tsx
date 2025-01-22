import { useTranslation } from "react-i18next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LanguageToggle } from "@/components/theme/LanguageToggle"

export const LanguageCard = () => {
  const { t } = useTranslation()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("language")}</CardTitle>
        <CardDescription>{t("changeLanguage")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{t("language")}</h3>
            <p className="text-sm text-muted-foreground">{t("chooseLanguage")}</p>
          </div>
          <LanguageToggle />
        </div>
      </CardContent>
    </Card>
  )
}