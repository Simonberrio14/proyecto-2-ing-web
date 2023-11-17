interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <main className="flex flex-col">{children}</main>;
};

export { Layout };
