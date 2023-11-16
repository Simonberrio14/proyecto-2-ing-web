interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
}

const NavigationCard = ({ title, description, href }: NavigationCardProps) => {
  return (
    <div className="navigation-card">
      <a href={href}>
        <div className="flex flex-col items-center">
          <h3>{title}</h3>
          <span>{description}</span>
        </div>
      </a>
    </div>
  );
};
export { NavigationCard };
