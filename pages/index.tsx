import { NavigationCard } from "@/components/NavigationCard";

const Home = () => {
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <h1>Sistema de gestión de inventarios</h1>
      <div className="mt-5">
        <NavigationCard
          title="Usuarios"
          description="Gestionar los usuarios de la plataforma"
          href="/usuarios"
        />
      </div>
    </main>
  );
};

export default Home;
