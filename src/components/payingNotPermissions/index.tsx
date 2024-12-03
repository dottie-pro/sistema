import { useRouter } from "next/router";

interface PayingNotPermissionProps {
    isPayingPermission: boolean
    userId: string
}

export const PayingNotPermission: React.FC<PayingNotPermissionProps> = ({ isPayingPermission = false, userId }) => {
    const router = useRouter();
    const myPerfil = router.asPath === `/users/${userId}`;

    return (
        <div>
            {(!isPayingPermission && !myPerfil) && (
                <div className="fixed z-[100] w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="text-2xl font-semibold text-white mb-4 text-center px-4">
                        Ative sua assinatura para começar a utilizar a plataforma!
                    </div>
                </div>
            )}
        </div>
    )
}