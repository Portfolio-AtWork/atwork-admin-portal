import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import SyncBackend from 'i18next-sync-fs-backend';

const ptTranslations = {
  translation: {
    "menu": "Menu",
    "dashboard": "Dashboard",
    "employees": "Funcionários",
    "settings": "Configurações",
    "logout": "Sair",
    "hello": "Olá",
    "theme": "Tema",
    "language": "Idioma",
    "light": "Claro",
    "dark": "Escuro",
    "system": "Sistema",
    "portuguese": "Português",
    "english": "Inglês",
    "employeeGroups": "Grupos de Funcionários",
    "name": "Nome",
    "email": "Email",
    "status": "Status",
    "active": "Ativo",
    "canceled": "Cancelado",
    "loadingGroups": "Carregando grupos...",
    "errorLoadingGroups": "Erro ao carregar grupos",
    "loadingEmployees": "Carregando funcionários...",
    "errorLoadingEmployees": "Erro ao carregar funcionários do grupo",
    "groupName": "Nome do grupo",
    "createGroup": "Criar Grupo",
    "creating": "Criando...",
    "groupCreated": "Grupo Criado",
    "groupCreatedSuccess": "Grupo criado com sucesso!",
    "groupCreationError": "Erro ao criar grupo",
    "error": "Erro",
    "createNewGroup": "Criar Novo Grupo"
  }
};

const enTranslations = {
  translation: {
    "menu": "Menu",
    "dashboard": "Dashboard",
    "employees": "Employees",
    "settings": "Settings",
    "logout": "Logout",
    "hello": "Hello",
    "theme": "Theme",
    "language": "Language",
    "light": "Light",
    "dark": "Dark",
    "system": "System",
    "portuguese": "Portuguese",
    "english": "English",
    "employeeGroups": "Employee Groups",
    "name": "Name",
    "email": "Email",
    "status": "Status",
    "active": "Active",
    "canceled": "Canceled",
    "loadingGroups": "Loading groups...",
    "errorLoadingGroups": "Error loading groups",
    "loadingEmployees": "Loading employees...",
    "errorLoadingEmployees": "Error loading employees from group",
    "groupName": "Group name",
    "createGroup": "Create Group",
    "creating": "Creating...",
    "groupCreated": "Group Created",
    "groupCreatedSuccess": "Group created successfully!",
    "groupCreationError": "Error creating group",
    "error": "Error",
    "createNewGroup": "Create New Group"
  }
};

i18n.use(initReactI18next).init({
  resources: {
    pt: ptTranslations,
    en: enTranslations,
  },
  lng: 'pt', // idioma padrão
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;