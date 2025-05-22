import { FaEnvelope } from "react-icons/fa";

export const Email = () => {
  return (
    <a
      href="mailto:schmi@dottie.pro"
      className="inline-flex items-center gap-2"
    >
      <FaEnvelope /> schmi@dottie.pro
    </a>
  );
};
