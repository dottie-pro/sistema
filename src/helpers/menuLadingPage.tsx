interface MenuItem {
    id: string;
    title: string;
    icon: string;
    userId?: boolean
    path: string;
    submenu?: MenuItem[]
    permissions: string[]
}

export const MenuLadingPage: MenuItem[] = [
    {
        id: '01', title: 'Leitor de Imagens', icon: '', path: '/dashboard', submenu: [], permissions: ['admin', 'client']
    },
    {
        id: '02', title: 'Dashboard', icon: '', path: `/users`, submenu: [], permissions: ['admin', 'client']
    },
    {
        id: '03', title: 'Recursos', icon: '', path: '/users', submenu: [], permissions: ['admin', 'client']
    },
    {
        id: '04', title: 'Preços', icon: '', path: '/customer', submenu: [], permissions: ['admin', 'client']
    },
]