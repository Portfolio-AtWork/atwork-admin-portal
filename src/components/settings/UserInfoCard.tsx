import { useTranslation } from "react-i18next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface UserInfoProps {
  userInfo: {
    nome: string
    login: string
    email: string
  }
}

export const UserInfoCard = ({ userInfo }: UserInfoProps) => {
  const { t } = useTranslation()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("userInformation")}</CardTitle>
        <CardDescription>{t("registrationData")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("name")}</label>
          <p className="text-foreground/80">{userInfo.nome}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Login</label>
          <p className="text-foreground/80">{userInfo.login}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-foreground/80">{userInfo.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}