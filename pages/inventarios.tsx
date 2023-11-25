import { Bar } from 'react-chartjs-2';
import { Sidebar } from "@/components/Sidebar";
import { API_SERVICES, fetcher } from "@/services";
import useSWR from "swr";
import { NuevoMovimiento } from "@/components/inventarios/NuevoMovimiento";
import { MaterialFilters } from "@/components/inventarios/MaterialFilters";
import { UserQuery } from "@/types";
import { useGetRoles } from "@/hooks/useGetRoles";
import { useState } from "react";
import { PrivateRoute } from "@/components/usuarios/PrivateRoute";
import React from 'react';

const Inventarios = () => {
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);
  const { roles } = useGetRoles();
  const { data, isLoading, error } = useSWR<UserQuery>(
    API_SERVICES.inventario,
    fetcher
  );

  const [chartData, setChartData] = useState(null);

  const [materialSeleccionado, setMaterialSeleccionado] = useState('');
  const [saldoMaterial, setSaldoMaterial] = useState(null);

  const handleMaterialSeleccionadoChange = (nuevoMaterial) => {
    setMaterialSeleccionado(nuevoMaterial);

    const obtenerSaldoMaterial = async () => {
      try {
        const resultado = await consultarBaseDeDatosParaSaldo(nuevoMaterial);
        setSaldoMaterial(resultado.saldo); 
      } catch (error) {
        console.error('Error al obtener el saldo del material', error);
        setSaldoMaterial(null); 
      }
    };

    obtenerSaldoMaterial();
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;

  //Grafica 

  if (data?.inventarios.length > 0) {
    const chartLabels = data.inventarios.map((inventario) => inventario.fecha.toString());
    const chartDataValues = data.inventarios.map((inventario) => inventario.entrada);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Entrada',
          data: chartDataValues,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    });
  }

  return (
    <PrivateRoute>
      <div className="flex h-screen">
        <div>{/* <Sidebar /> */}</div>
        <div className="w-[100%]">
          <div className="flex items-center justify-center bg-white p-10">
            <h1 className="text-black text-center text-4xl">
              Gestión de Inventarios
            </h1>
          </div>
          <div className="flex justify-between px-20">
            <span>
              <MaterialFilters />
            </span>
            <span>
              <button
                className="mt-3 text-black text-sm  border border-gray-300 gap-2 px-4 py-2 font-semibold hover:scale-105 bg-white "
                type="button"
                onClick={() => setOpenNuevoMovimiento(true)}
              >
                Agregar Movimiento
              </button>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mt-10 gap-3">
            <table cellSpacing="0" className="materialesTable">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Responsable</th>
                </tr>
              </thead>
              <tbody>
                {data?.inventarios.map((inventario) => {
                  return (
                    <tr key={inventario.id}>
                      <td>{inventario.id}</td>
                      <td>{inventario.fecha.toString()}</td>
                      <td>{inventario.entrada}</td>
                      <td>{inventario.salida}</td>
                      <td>{inventario.responsable}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between px-20">
            <span>
              <h1 className="text-black text-center text-2xl gap-3">
                Saldo: {saldoMaterial !== null ? saldoMaterial : 'Cargando saldo...'}
              </h1>
            </span>
            <span></span>
          </div>
          <div>
            {chartData ? (<div className="mt-10">
          <h2 className="text-black text-center text-2xl gap-3">Gráfica</h2>
          <Bar data={chartData} />
        </div>
      ) : (
        <div className="mt-10">{chartData ? (
          <div className="mt-10">
            <h2 className="text-black text-center text-2xl gap-3">Gráfica</h2>
            <Bar data={chartData} />
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-black text-center text-2xl gap-3">Gráfica</h2>
            <Bar
              data={{
                datasets: [],
                labels: []
              }}
              options={{
                scales: {
                  x: [
                    {
                      grid: {
                        display: false
                      },
                      ticks: {
                        display: false
                      },
                      scaleLabel: {
                        display: false
                      }
                    }
                  ],
                  y: [
                    {
                      grid: {
                        display: false
                      },
                      ticks: {
                        display: false
                      },
                      scaleLabel: {
                        display: false
                      }
                    }
                  ]
                }
              }}
            />
          </div>
        )}</div>
      )}
    </div>
          
        </div>
        <NuevoMovimiento open={openNuevoMovimiento} setOpen={setOpenNuevoMovimiento} />
      </div>
    </PrivateRoute>
  );
};

export default Inventarios;