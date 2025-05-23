import Head from "next/head";
import { FC } from "react";
import { ProtectRoute } from "@/context/ProtectRoute";
import { Navbar } from "@/components/navbar/Navbar";
import { MenuList } from "@/helpers/menu";

interface PagesRouteProps {
  Component: React.ComponentType<any> & { noPadding?: boolean };
  pageProps: any;
}

const PagesRoute: FC<PagesRouteProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Dottie - Plataforma</title>
        <meta name="description" content="Dottie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/icons/avatar-dottie.png" />
      </Head>
      <ProtectRoute>
        <div className="bg-gray-100 min-h-screen flex w-full">
          <Navbar menu={MenuList} />
          <div className="flex overflow-auto w-full flex-col gap-8 py-12 h-full pt-32">
            <Component {...pageProps} />
          </div>
        </div>
      </ProtectRoute>
    </>
  );
};

export default PagesRoute;
