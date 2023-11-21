import { NavigationCard } from "./NavigationCard";

const Sidebar = () => {
  return (
    <aside className="bg-gray-300 debug w-342px h-full flex flex-col gap-2 px-0 py-90">
      <div className="bg-gray-300 flex flex-col items-center debug w-full h-314 gap-0 pb-1 relative p-10 px-10 py-90">
        <img
          className="bg-black rounded-full w-36 h-36 blackground_foto"
          src="/images/Foto-imagen.jpg"
          alt="Foto"
        />

        <span className="font-semibol text-slate-900 text-white mt-4">
          Nombre del usuario
        </span>
      </div>
      <div className="bg-gray flex flex-col items-center debug w-full h-314 gap-1 pb-1 relative p-10 px-5">
        <NavigationCard title="Inventarios" href="/inventarios" />
        <NavigationCard title="Materiales" href="/materiales" />
        <NavigationCard title="Usuarios" href="/usuarios" />
      </div>
    </aside>
  );
};

export { Sidebar };
