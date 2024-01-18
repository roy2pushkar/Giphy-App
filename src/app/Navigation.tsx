import React from "react";
import Link from "next/link";

interface NavLink {
  name: string;
  path: string;
  onClick?: () => void; // Assuming onClick is a function
}

interface NavigationProps {
  links: NavLink[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <a className="text-sm text-white cursor-pointer" onClick={link.onClick}>
                {link.name}
              </a>
            ) : (
              <Link href={link.path}>
                <a className="text-white text-sm">{link.name}</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
