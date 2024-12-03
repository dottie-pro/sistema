interface MenuItem {
    id: string;
    title: string;
    icon: string;
    userId?: boolean
    path: string;
    submenu?: MenuItem[];
    permissions: string[]
}

export const MenuList: MenuItem[] = [
    {
        id: '01', title: 'Painel', icon: '', path: '/dashboard', submenu: [], permissions: ['admin', 'client']
    },
    {
        id: '03', title: 'Usuários', icon: '', path: '/users', submenu: [], permissions: ['admin']
    },
    {
        id: '05', title: 'Arquivos enviados', icon: '', path: '/analytics', submenu: [], permissions: ['admin', 'client']
    },
]