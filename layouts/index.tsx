import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();
  console.log(status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <main className="flex flex-col ">{children}</main>;
  }

  return <main className="flex flex-col">{children}</main>;
};

export { Layout };
