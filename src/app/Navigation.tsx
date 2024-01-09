import Link from "next/link";
import React from "react";
interface NavLink {
    name:string;
    path:string;
    onClick?:void;
}
interface NavigationProps {
    links: NavLink[];

}


const Navigation = ({links :any}) => {
    return (
        <nav>
            <ul>
                {links.map((link,index) => (
                    <li key={index}>
                        
                    {link.onclick ? (
                        <a className="text-sm text-white cursor-pointer">
                        {link.name}
                        </a>

                    ):(
                        <link href={link.path}>
                             <a className="text-white text-sm">{link.name}</a>
                        </link>
                    )}

                    </li>
                ))}
            </ul>
        </nav>
    )
   
}
 export default Navigation ;