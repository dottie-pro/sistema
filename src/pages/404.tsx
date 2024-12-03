// pages/404.tsx
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ErrorPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página inicial após 5 segundos
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <div>
      <h1>Error 404</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <p>You will be redirected to the home page shortly...</p>
    </div>
  );
};

export default ErrorPage;
