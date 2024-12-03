import { CryptoModal } from "@/components";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "@/helpers/api";
import { useRouter } from "next/router";

export interface UserAuthentication {
    email?: string,
    password?: string
}

interface AppContextType {
    handleLogin: (userData: UserAuthentication) => Promise<void | object | any>;
    loading: boolean
    isPayingPermission: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userData: object | any;
    setUserData: React.Dispatch<React.SetStateAction<object | any>>;
    alertData: AlertData,
    setAlertData: React.Dispatch<React.SetStateAction<AlertData>>;
    isAuthenticated: boolean
    logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

interface AlertData {
    active: boolean,
    title?: string,
    message?: string,
    type: string
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<object | any>();
    const [isPayingPermission, setIsPayingPermission] = useState<boolean>(false);

    const [alertData, setAlertData] = useState<AlertData>({
        active: false,
        title: '',
        message: '',
        type: ''
    })
    const router = useRouter()


    useEffect(() => {
        async function loadUserFromCookies() {
            setLoading(true)

            const token = localStorage.getItem('token')

            try {
                if (token != 'null') {
                    api.defaults.headers.authorization = `Bearer ${token}`

                    // Timeout configurado
                    const TIMEOUT_MS = 5000; // 10 segundos
                    const timeout = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout: A API demorou muito para responder')), TIMEOUT_MS)
                    );

                    // Combina a chamada da API com o timeout
                    const response: any = await Promise.race([
                        api.post('/user/loginbytoken'),
                        timeout,
                    ]);

                    const { success } = response.data;

                    if (success) {
                        const { user } = response.data
                        setUserData(response.data.user)
                        console.log(user.paying)
                        console.log(user.permissions)

                        const isPermissionPaying = user.permissions.includes('admin') ? true : user.paying ? true : false
                        setIsPayingPermission(isPermissionPaying)
                    } else {
                        setUserData(null);
                    }
                }
            } catch (error: any) {
                localStorage.setItem('token', '');
                console.error(error);
return false
            } finally {
                setLoading(false);
            }
        }
        loadUserFromCookies()
    }, [])



    const handleLogin = async (userAuthentication: UserAuthentication) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userAuthentication } as Record<string, unknown>)
            });

            if (!response.ok) {
                return false
            }
            const data = await response.json();

            if (data.success) {
                const { token } = data.user
                setUserData(data.user)
                console.log(data.user.paying)

                const isPermissionPaying = data.user.permissions.includes('admin') ? true : data.user.paying ? true : false
                setIsPayingPermission(isPermissionPaying)

                localStorage.setItem('token', token)
                api.defaults.headers.Authorization = `Bearer ${token}`

                router.push('/dashboard')

                return { success: true };
            } else {
                return { success: false, message: data.message };
            }

        } catch (error) {
            console.error('Erro ao verificar o usuário:', error);
            return error
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUserData(null)
        delete api.defaults.headers.Authorization
    }

    useEffect(() => {
        if (userData) {
            setUserData(userData)
        }
    }, [])


    // const checkTokenExpiration = () => {
    //     const token = localStorage.getItem('token')

    //     if (token != null && typeof token == 'string') {
    //         try {
    //             const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    //             const expirationTime = tokenPayload.exp * 1000; // em milissegundos
    //             const currentTime = new Date().getTime();
    //             const timeUntilExpiration = expirationTime - currentTime;
    //             const notificationThreshold = 5 * 60 * 1000;

    //             if (timeUntilExpiration < 0) {
    //                 logout();
    //                 setAlertData({
    //                     active: true,
    //                     title: 'Sessão expirada!',
    //                     message: 'Sua sessão expirou. Faça login novamente.',
    //                     type: 'alert'
    //                 })

    //             } else if (timeUntilExpiration < notificationThreshold) {
    //                 setAlertData({
    //                     active: true,
    //                     title: 'Seu token está expirando!',
    //                     message: 'Seu token está prestes a expirar. Faça login novamente.',
    //                     type: 'alert'
    //                 })
    //             }
    //         } catch (error) {
    //             console.error('Erro ao decodificar o token:', error);
    //             logout();
    //             return error
    //         }
    //     }
    // };
    // useEffect(() => {
    //     checkTokenExpiration();

    //     // Adicione um listener para mudanças de rota
    //     const handleRouteChange = () => {
    //         checkTokenExpiration();
    //     };

    //     // Adicione o listener
    //     router.events.on('routeChangeStart', handleRouteChange);

    //     // Remova o listener quando o componente for desmontado
    //     return () => {
    //         router.events.off('routeChangeStart', handleRouteChange);
    //     };
    // }, []);


    return (
        <AppContext.Provider
            value={{
                handleLogin,
                loading, setLoading,
                userData, setUserData,
                alertData,
                setAlertData,
                isAuthenticated: !!userData,
                logout,
                isPayingPermission
            }}
        >
            {children}

            <div className="flex">
                <CryptoModal title={alertData?.title} type={alertData?.type} isOpen={alertData?.active} closeModal={() => setAlertData({ active: false, title: '', message: '', type: '' })}>
                    <div className='w-full gap-2 align-center flex justify-center py-2 flex-col items-center'>
                        <p className="mt-5 text-gray-700">{alertData?.message}</p>
                    </div>
                </CryptoModal>
            </div>

            {loading && <LoaderDrop />}


        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextType => {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context
}

export const LoaderDrop = () => {
    return (
        <div className="absolute w-full flex flex-col items-center justify-center h-screen -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            {/* <!-- Texto de carregamento --> */}
            {/* <div className="text-lg font-semibold text-gray-700 mb-4 justify-center text-center">
                Carregando...
            </div> */}

            {/* <!-- Rodapé com um ícone de upload --> */}
            <div className="mt-4 flex items-center">
                <svg
                    className="animate-spin h-8 w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                <span className="ml-2 text-blue-600">Carregando...</span>
            </div>
        </div>
    )
}