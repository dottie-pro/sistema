import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppProps {
  withName?: boolean;
}

const whatsappMessage = encodeURIComponent(
  "Olá! Gostaria de contratar os serviços da Dottie."
);
const whatsappLink = `https://wa.me/5511996075093?text=${whatsappMessage}`;

export const WhatsApp = ({ withName = false }: WhatsAppProps) => {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <FaWhatsapp /> {withName ? "WhatsApp" : ""}
    </a>
  );
};
