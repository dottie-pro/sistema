import { Body, SectionHeader } from "@/components";
import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import { api } from "@/helpers/api";
import { NewUserDataObject } from "@/helpers/types";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import LogoPreviewer from "./components/LogoPreviewer";

type Logo = {
  _id: string;
  url: string;
};

const UserEdit: React.FC = () => {
  const [userData, setUserData] = useState<NewUserDataObject>({
    name: "",
    email: "",
    phone: "",
    password: null,
    confirmPassword: null,
    paying: false,
    permissions: [],
  });
  const [logoLoading, setLogoLoading] = useState<boolean>(false);
  const [getLogoLoading, setGetLogoLoading] = useState<boolean>(false);
  const [logo, setLogo] = useState<Logo | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { setAlertData, setLoading, loading, userData: user } = useAppContext();
  const router = useRouter();
  const { id } = router.query;
  const newUser = id === "new";
  const isAdmin = user.permissions.includes("admin");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (value: string) => {
    const alreadySelected = userData?.permissions?.includes(value);
    const updatedValues = alreadySelected
      ? userData?.permissions?.filter((perm) => perm !== value)
      : [...userData?.permissions, value];

    setUserData({ ...userData, permissions: updatedValues });
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/${id}`);
      const { success, user } = response?.data;
      if (!success) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro ao buscar usuário.",
          message: "Erro ao buscar pelo usuário",
          type: "error",
        });
        return;
      }

      const { name, email, phone, permissions, paying } = user;
      setUserData({
        paying,
        name,
        email,
        phone,
        password: "",
        confirmPassword: "",
        permissions,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLogo = async () => {
    setGetLogoLoading(true);
    try {
      const response = await api.get(`/user/logo`);
      const { success, logo: responseLogo } = response?.data;
      if (!success) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro ao buscar logomarca.",
          message: "Erro ao buscar logomarca",
          type: "error",
        });
        return;
      }

      setLogo(responseLogo);
    } catch (error) {
      console.log(error);
    } finally {
      setGetLogoLoading(false);
    }
  };

  const handleLogoRemove = async () => {
    setLogoLoading(true);
    const response = await api.delete(`/user/logo/${logo?._id}`);
    const { success } = response?.data;
    if (!success) {
      setAlertData({
        active: true,
        title: "Ocorreu um erro ao remover logomarca.",
        message: "Erro ao remover logomarca",
        type: "error",
      });
      return;
    }
    setLogo(null);
    setLogoFile(null);
    setLogoLoading(false);
  };

  const handleLogoUpload = async () => {
    setLogoLoading(true);
    if (!logoFile) {
      setAlertData({
        active: true,
        title: "Erro.",
        message: "Nenhuma alteração a ser realizada",
        type: "error",
      });
      setLogoLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      const fileName = encodeURIComponent(logoFile?.name);
      formData.append("file", logoFile, fileName);
      const response = await api.post("/user/logo", formData);
      const { success, logo: responseLogo } = response?.data;
      if (!success) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro ao enviar logomarca.",
          message: "Erro ao enviar logomarca",
          type: "error",
        });
        return;
      }
      setLogo(responseLogo);
      setLogoFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLogoLoading(false);
    }
  };

  useEffect(() => {
    if (!newUser && id) {
      getUser();
      getLogo();
    }
  }, [id]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData } as Record<string, unknown>),
      });

      if (!response.ok) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro.",
          message: "Erro ao criar o usuário",
          type: "error",
        });
        return;
      }

      const data = await response.json();

      setAlertData({
        active: true,
        title: "Tudo Certo!",
        message: "Usuário cadastrado com sucesso!",
        type: "success",
      });

      router.push(`/users/${data.userId}`);
      return;
    } catch (error) {
      console.error("Erro ao verificar o usuário:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/user/update/${id}`, { userData });
      const { success, user } = response?.data;
      if (!success) {
        setAlertData({
          active: true,
          title: "Erro na atualização.",
          message: "Erro ao atualizar o usuário",
          type: "error",
        });
        return;
      }

      const { name, email, phone, permissions, paying } = user;
      setUserData({
        paying,
        name,
        email,
        phone,
        password: "",
        confirmPassword: "",
        permissions,
      });

      setAlertData({
        active: true,
        title: "Atualizado!",
        message: "Informações do usuário atualizadas.",
        type: "success",
      });
      return;
    } catch (error) {
      console.error("Erro ao verificar o usuário:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/user/delete/${id}`);

      const { success } = response?.data;

      if (!success) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro ao excluir usuário.",
          message: "Erro ao excluir usuário",
          type: "error",
        });
        return;
      }

      setAlertData({
        active: true,
        title: "Tudo Certo!",
        message: "Usuário excluído com sucesso!",
        type: "success",
      });

      router.push("/users");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <SectionHeader title={"Usuário"} />
      <div className="bg-white rounded py-5 px-6">
        <h1 className="text-gray-900 text-2xl font-bold pb-8">
          Dados do Usuário
        </h1>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={userData?.name || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              value={userData?.phone || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="123-45-678"
              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={userData?.email || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Senha
          </label>
          <input
            type="password"
            name="password"
            value={userData?.password || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirmar Senha
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={userData?.confirmPassword || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            onChange={handleChange}
          />
        </div>
        {isAdmin && (
          <>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="text-gray-800">Permissões</div>
            </label>

            <div className="flex mb-3 mt-3 gap-3">
              <div className="flex items-start gap-1">
                <label
                  htmlFor="remember"
                  className="font-light ms-2 text-sm font-medium"
                >
                  <div className="font-light text-black">Cliente</div>
                </label>

                <div className="flex items-center h-5">
                  <input
                    name="client"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    checked={userData.permissions?.includes("client")}
                    onChange={() => handleCheckboxChange("client")}
                  />
                </div>
              </div>

              <div className="flex items-start mb-6">
                <label
                  htmlFor="remember"
                  className="font-light ms-2 text-sm font-medium"
                >
                  <div className="font-light text-black">Adminstrador</div>
                </label>

                <div className="flex items-center h-5">
                  <input
                    name="admin"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    checked={userData.permissions?.includes("admin")}
                    onChange={() => handleCheckboxChange("admin")}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={userData.paying}
                  onChange={() =>
                    setUserData((prev) => ({ ...prev, paying: !prev.paying }))
                  }
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">
                  {" "}
                  Acesso Pagante
                </span>
              </label>
            </div>
          </>
        )}
        <div className="flex gap-2">
          <Button
            arrowIcon={!loading}
            isLoading={loading}
            text="Salvar"
            onClick={() => (newUser ? handleCreate() : handleUpdate())}
          />

          {!newUser && (
            <button
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center"
              onClick={() => handleDelete()}
            >
              Excluir
            </button>
          )}
        </div>
        <h1 className="text-gray-900 text-2xl font-bold mt-8 mb-4">
          Logomarca Customizada
        </h1>

        <div className="flex flex-col gap-4">
          <h1 className="text-gray-900 text-sm font-bold">
            Prévia do cabeçalho
          </h1>
          <LogoPreviewer
            previousLogo={logo?.url}
            logo={logoFile}
            getLogoLoading={getLogoLoading}
          />
          <div className="flex flex-row gap-2">
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                multiple={false}
                className="hidden"
                id="logo-upload"
              />

              <label
                htmlFor="logo-upload"
                className=" h-full flex items-center justify-center text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center cursor-pointer"
              >
                Escolher imagem
              </label>
            </div>
            {logoFile && (
              <button
                onClick={() => setLogoFile(null)}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center cursor-pointer inline-block"
              >
                Remover logomarca
              </button>
            )}
            <Button
              arrowIcon={!logoLoading}
              isLoading={logoLoading}
              text="Salvar"
              onClick={() => handleLogoUpload()}
            />
            {logo && (
              <Button
                text="Voltar ao padrão"
                onClick={() => handleLogoRemove()}
              />
            )}
          </div>
        </div>
      </div>
    </Body>
  );
};

export default UserEdit;
