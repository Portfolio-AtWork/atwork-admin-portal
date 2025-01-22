import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";

const Home = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao @Work Admin</h2>
            <p className="text-gray-600">Selecione uma opção no menu lateral para começar.</p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Home;