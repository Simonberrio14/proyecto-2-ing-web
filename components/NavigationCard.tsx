import Link from "next/link";

interface NavigationCardProps {
  title: string;
  href: string;
}

const NavigationCard = ({ title, href }: NavigationCardProps) => {
  return (
    <div className="navigation-card border border-gray-300 gap-2  p-4 w-full h-314">
      <Link href={href}>
        <div className="flex flex-col px-2 font-semibold">
          <h3>{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export { NavigationCard };
