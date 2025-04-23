import { Spinner } from "@/components/spinner/Spinner";

interface LogoPreviewerProps {
  logo: File | null;
  previousLogo: string | undefined;
  getLogoLoading: boolean;
}

const LogoPreviewer: React.FC<LogoPreviewerProps> = ({
  logo,
  previousLogo,
  getLogoLoading,
}) => {
  return (
    <div className="bg-white  border-gray-200 dark:bg-white shadow-lg">
      <div className="flex items-center justify-between py-4 px-8">
        <div className="flex items-center">
          <div className="flex items-center px-2 py-2 gap-2">
            {getLogoLoading ? (
              <div className="flex items-center justify-center">
                <Spinner className="w-6 h-6" />
              </div>
            ) : (
              <>
                <img
                  src={
                    logo
                      ? URL.createObjectURL(logo)
                      : previousLogo || "/icons/avatar-dottie.png"
                  }
                  className="h-6 me-3 sm:h-12"
                />
                {!logo && !previousLogo && (
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
            <li key={"menu_mocked_1"}>
              <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="text-gray-700 flex-1 mx-3 whitespace-nowrap">
                  Painel
                </span>
              </div>
            </li>
            <li key={"menu_mocked_2"}>
              <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="text-gray-700 flex-1 mx-3 whitespace-nowrap">
                  Arquivos enviados
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoPreviewer;
