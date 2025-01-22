import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const userName = localStorage.getItem("userName") || "";

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">@Work Admin</h1>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <p className="text-sm text-muted-foreground">
            {t('hello')}, {userName}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;