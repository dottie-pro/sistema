import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PagesRoute from "./pagesRoutes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <PagesRoute Component={Component} pageProps={pageProps} />
    </AppProvider>
  )
}
