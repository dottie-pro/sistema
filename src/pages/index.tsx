import { Body } from "@/components";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [])

  return (
    <Body>
      <div className="flex flex-col gap-4 w-full pt-24 justify-start h-full" >
        <h1 className="text-gray-700 font-light text-2xl text-center">Consolide os Resultados de Suas Campanhas
          Com Influenciadores em Três Passos</h1>
      </div>
    </Body>
  );
}
