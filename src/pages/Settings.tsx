import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { LanguageToggle } from "@/components/theme/LanguageToggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next";

interface PasswordChangeForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const Settings = () => {
  const { toast } = useToast()
  const { t } = useTranslation();
  const { language } = useLanguage()
  const form = useForm<PasswordChangeForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const userInfo = {
    nome: localStorage.getItem("nome") || "",
    login: localStorage.getItem("login") || "",
    email: localStorage.getItem("email") || "",
  }

  const onSubmit = (data: PasswordChangeForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt' ? "As senhas não coincidem" : "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    console.log("Changing password:", data)
    toast({
      title: language === 'pt' ? "Sucesso" : "Success",
      description: language === 'pt' ? "Senha alterada com sucesso" : "Password changed successfully",
    })
    form.reset()
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'pt' ? "Configurações" : "Settings"}
      </h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{language === 'pt' ? "Informações do Usuário" : "User Information"}</CardTitle>
          <CardDescription>{language === 'pt' ? "Seus dados cadastrais" : "Your registration data"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">{language === 'pt' ? "Nome" : "Name"}</label>
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{language === 'pt' ? "Aparência" : "Appearance"}</CardTitle>
          <CardDescription>
            {language === 'pt' ? "Personalize o tema do sistema" : "Customize system theme"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{language === 'pt' ? "Tema" : "Theme"}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'pt' 
                  ? "Escolha entre tema claro, escuro ou do sistema" 
                  : "Choose between light, dark, or system theme"}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{language === 'pt' ? "Idioma" : "Language"}</CardTitle>
          <CardDescription>
            {language === 'pt' ? "Altere o idioma do sistema" : "Change system language"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{language === 'pt' ? "Idioma" : "Language"}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'pt' 
                  ? "Escolha entre Português e Inglês" 
                  : "Choose between Portuguese and English"}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>{language === 'pt' ? "Alterar Senha" : "Change Password"}</CardTitle>
          <CardDescription>
            {language === 'pt' ? "Atualize sua senha de acesso" : "Update your access password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'pt' ? "Senha Atual" : "Current Password"}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'pt' ? "Nova Senha" : "New Password"}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'pt' ? "Confirmar Nova Senha" : "Confirm New Password"}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {language === 'pt' ? "Alterar Senha" : "Change Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings;
