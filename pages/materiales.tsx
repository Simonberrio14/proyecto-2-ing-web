import { Sidebar } from "@/components/Sidebar";

interface MaterialesProps {
  identificador: string;
  fecha: string;
  nombre: string;
  saldo: string;
  creado: string;
}

const Materiales = ({
  identificador,
  fecha,
  nombre,
  saldo,
  creado,
}: MaterialesProps) => {
  ({
    identificador: "",
    fecha: "",
    nombre: "",
    saldo: "",
    creado: "",
  });

  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-[100%]">
        <div className="flex items-center justify-center bg-white p-10">
          <h1 className="text-black text-center text-4xl">
            Gestión de Materiales
          </h1>
        </div>
        <div className="flex justify-between px-20">
          <span></span>
          <span>
            <button
              className="mt-3 text-black text-sm  border border-gray-300 gap-2 px-4 py-2 font-semibold hover:scale-105 bg-white "
              type="submit"
            >
              Agregar material
            </button>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 gap-3">
          <table cellSpacing="0" className="materialesTable">
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Fecha de creación</th>
                <th>Nombre</th>
                <th>Saldo</th>
                <th>Creado por</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>112313</td>
                <td>12/10</td>
                <td>Sandra</td>
                <td>6</td>
                <td>Andres</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Materiales;
