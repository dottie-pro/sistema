import { Email } from "@/components/Email/Email";
import { WhatsApp } from "@/components/WhatsApp/WhatsApp";

export default function Upgrade() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-4xl font-bold text-neutral-700 gap-8">
      <p className="text-center">
        Contrate nossos serviços através dos nossos canais para obter acesso
        ilimitado à Dottie!
      </p>
      <div>
        <WhatsApp withName />
      </div>
      <Email />
    </div>
  );
}
