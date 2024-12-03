import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import React, { useState } from 'react'; 

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  userId?: boolean
  submenu?: MenuItem[];
}

interface SidebarProps {
  menu: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({ active: false, id: '' });
  const { userData } = useAppContext()

  const toggleDropdown = (menuId?: string) => {
    if (isDropdownOpen.active && isDropdownOpen.id === menuId) {
      setIsDropdownOpen({ active: false, id: '' });
    } else {
      setIsDropdownOpen({ active: true, id: menuId || '' });
    }
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 min-w-56 h-screen transition-transform -translate-x-full sm:translate-x-0 z-50"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 shadow-lg">
        <Link href="/dashboard" className="flex items-center ps-2.5 mb-5">
          <img
            src="./icons/analytcs_data.jpg"
            className="h-6 me-3 sm:h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Company
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
