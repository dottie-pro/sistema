import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PayingNotPermission } from "../payingNotPermissions";
import { api } from "@/helpers/api";
import { Spinner } from "../spinner/Spinner";
interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  userId?: boolean;
  submenu?: MenuItem[];
  permissions: string[];
}

interface NavbarProps {
  menu: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ menu }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userData, logout, isPayingPermission } = useAppContext();
  const [logo, setLogo] = useState<{ url: string } | null>(null);
  const [logoLoading, setLogoLoading] = useState<boolean>(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropMenuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getLogo = async () => {
    setLogoLoading(true);
    const response = await api.get(`/user/logo`);
    const { success, logo: responseLogo } = response?.data;
    if (success && responseLogo) {
      setLogo(responseLogo);
    }
    setLogoLoading(false);
  };

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropMenuRef.current &&
        !dropMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    if (userData) {
      getLogo();
    }

    return () => {
      document.addEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <>
      <PayingNotPermission
        isPayingPermission={isPayingPermission}
        userId={userData._id}
      />

      <nav className="bg-white w-full border-gray-200 dark:bg-white fixed z-[100000] shadow-lg">
        <div className="flex items-center justify-between py-4 px-8">
          <div className="flex items-center">
            <div className="flex items-center px-2 py-2 gap-2">
              {logoLoading ? (
                <Spinner />
              ) : (
                <>
                  <img
                    src={logo ? logo.url : "/icons/avatar-dottie.png"}
                    className="h-6 me-3 sm:h-12"
                    alt="Flowbite Logo"
                  />
                  {!logo && (
                    <img
                      src="/icons/logo-dottie.png"
                      className="h-3 me-2 sm:h-5"
                      alt="Flowbite Logo"
                    />
                  )}
                </>
              )}
            </div>

            <ul className="font-medium flex gap-2 ml-32">
              {menu.map((menuItem) => {
                const isPermission = userData
                  ? menuItem.permissions.some((i) =>
                      userData.permissions.includes(i)
                    )
                  : true;
                if (isPermission) {
                  return (
                    <li key={menuItem.id}>
                      <Link
                        href={
                          menuItem.userId
                            ? `${menuItem.path}/${userData._id}`
                            : menuItem.path
                        }
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                      >
                        <span className="text-gray-700 flex-1 mx-3 whitespace-nowrap">
                          {menuItem.title}
                        </span>
                      </Link>
                    </li>
                  );
                } else {
                  return <></>;
                }
              })}
            </ul>
          </div>

          {userData ? (
            <div className="flex gap-2 w-100">
              <button
                className="text-white flex py-2 px-4 rounded bg-[#FF6700] align-center justify-center rounded-lg"
                onClick={() => router.push("/upload-files")}
              >
                <span className="text-white">Subir imagens</span>
              </button>

              <div className="relative">
                <button
                  className="flex py-2 px-4 rounded border rounded-lg border-black align-center justify-center"
                  onClick={toggleUserMenu}
                  ref={buttonRef}
                >
                  <span className="text-gray-800">Minha conta</span>
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                    id="user-dropdown"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    ref={dropMenuRef}
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-500 truncate">
                        {userData?.name || "Marcus Silva"}
                      </span>
                    </div>
                    <ul
                      className="py-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <li>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Início
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/users/${userData._id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Meus Dados
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Alterar senha
                        </Link>
                      </li>
                      <li>
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  cursor-pointer"
                          onClick={() => logout()}
                        >
                          Sair
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 w-100">
              <button
                className="flex py-2 px-4 rounded border rounded-lg border-black align-center justify-center"
                onClick={() => router.push("/authentication")}
              >
                <span className="text-gray-800">Entrar</span>
              </button>

              <button
                className="text-white flex py-2 px-4 rounded bg-[#FF6700] align-center justify-center rounded-lg"
                onClick={() => router.push("/register")}
              >
                <span className="text-white">Começe Grátis</span>
              </button>
            </div>
          )}

          {/* {userData && 
                <div className="flex items-center space-x-3 md:space-x-0 gap-6">
                    <img
                        className="w-5 h-5 rounded-full"
                        src="./icons/bell.png"
                        alt="user photo"
                    />
                    <div className="relative">
                        <button
                            type="button"
                            className="flex rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                            id="user-menu-button"
                            aria-expanded={isUserMenuOpen}
                            onClick={toggleUserMenu}
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="./icons/perfil.jpg"
                                alt="user photo"
                            />
                        </button>
                        
                    </div>
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={isUserMenuOpen}
                        onClick={toggleUserMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>} */}
        </div>
      </nav>
    </>
  );
};
