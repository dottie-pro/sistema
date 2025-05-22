import { useRouter } from "next/router";
import { WhatsApp } from "../WhatsApp/WhatsApp";
import { Email } from "../Email/Email";

interface PayingNotPermissionProps {
  isPayingPermission: boolean;
  userId: string;
}

export const PayingNotPermission: React.FC<PayingNotPermissionProps> = ({
  isPayingPermission = false,
  userId,
}) => {
  const router = useRouter();
  const myPerfil = router.asPath === `/users/${userId}`;

  return (
    <div>
      {!isPayingPermission && !myPerfil && (
        <div className="fixed z-[100] w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 top-0">
          <div className="text-2xl font-semibold text-white mb-4 text-center px-4 justify-center items-center">
            <p>Créditos insuficientes</p>
            <p className="mb-8">Contrate nossos serviços através dos canais:</p>
            <p className="flex text-4xl gap-8 mb-8">
              <WhatsApp withName />

              <Email />
            </p>
            <p>ou aguarde a renovação dos seus créditos!</p>
          </div>
        </div>
      )}
    </div>
  );
};
