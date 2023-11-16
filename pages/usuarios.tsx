import { API_SERVICES, fetcher } from "@/services";
import useSWR from "swr";
import Image from "next/image";
import { UsersTableActions } from "@/components/usuarios/UsersTableActions";
import { UserQuery } from "@/types";
import { useGetRoles } from "@/hooks/useGetRoles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { NewUserDialog } from "@/components/usuarios/NewUserDialog";
import { useState } from "react";

const UsersPage = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const { roles } = useGetRoles();
  const { data, isLoading, error } = useSWR<UserQuery>(
    API_SERVICES.users,
    fetcher
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <main className="flex flex-col items-center p-10 gap-5">
      <section>
        <div className="flex items-center gap-3">
          <h1>Gestión de usuarios</h1>
          <Tooltip title="Crear nuevo usuario">
            <button
              type="button"
              onClick={() => setOpenNewUserDialog(true)}
              className="flex text-2xl mt-2 text-indigo-700 hover:scale-110"
            >
              <AiOutlinePlusCircle />
            </button>
          </Tooltip>
        </div>
      </section>
      <section>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha de creación</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => {
              return (
                <tr key={user.id}>
                  {/* <td>
                    <Image
                      className="rouded-full"
                      src={user.image}
                      height={30}
                      width={30}
                      alt="user"
                    />
                  </td> */}
                  <td>{user.id}</td>
                  <td>{user.createAt.toString()}</td>
                  <td>{user.email}</td>
                  <td>{user.roleId}</td>
                  {/* <td>
                    {roles?.find((r) => r.id === user.roleId)?.name ?? ""}
                  </td> */}
                  <td>
                    <UsersTableActions user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <NewUserDialog open={openNewUserDialog} setOpen={setOpenNewUserDialog} />
    </main>
  );
};

export default UsersPage;
