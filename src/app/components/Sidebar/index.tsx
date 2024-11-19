import Link from 'next/link';
import { SidebarContainer } from './styles';

export default function Sidebar() {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Motoristas', path: '/drivers' },
    { label: 'Configurações', path: '/settings' },
  ];

  return (
    <SidebarContainer className="">
      <h1>LOGO</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link className="text-sky-50 font-semibold text-2xl" href={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>logout</div>
    </SidebarContainer>
  );
}
