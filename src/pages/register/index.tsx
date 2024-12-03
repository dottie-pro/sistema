import { Body } from "@/components"
import { Button } from "@/components/button/Button"
import { Card, CardTitle, CardText, CardButton } from "@/components/card"
import { Divider } from "@/components/divider/Divider"
import { useAppContext } from "@/context/AppContext"
import { NewUserDataObject } from "@/helpers/types"
import { useRouter } from "next/router"
import React, { useState } from "react"

interface UserRegisterObject {
    email: string,
    password: string
}

const Register: React.FC = () => {

    const { loading, setLoading, setAlertData } = useAppContext()
    const [userRegister, setUserRegister] = useState<NewUserDataObject>({
        name: '',
        email: '',
        phone: '',
        password: null,
        paying: false,
        confirmPassword: null,
        permissions: []
    })
    const router = useRouter()

    const verifyInputs = () => {

        if (!userRegister.password) {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha a senha corretamente.',
                type: 'info'
            })
            return false
        }

        if (userRegister.password != userRegister.confirmPassword) {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'As senhas não são iguais.',
                type: 'info'
            })
            return false
        }

        if (!userRegister.email) {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha o email corretamente.',
                type: 'info'
            })
            return false
        }

        if (!userRegister.name) {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha o nome corretamente.',
                type: 'info'
            })
            return false
        }

        if (!userRegister.name) {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha o nome corretamente.',
                type: 'info'
            })
            return false
        }

        return true
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setUserRegister((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const handleCreate = async () => {
        if (verifyInputs()) {


            setLoading(true)
            try {
                const response = await fetch('/api/user/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userData: userRegister } as Record<string, unknown>)
                });

                if (!response.ok) {
                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro.',
                        message: 'Erro ao criar o usuário',
                        type: 'error'
                    })
                    return
                }

                const data = await response.json();

                if (data.success) {
                    setAlertData({
                        active: true,
                        title: 'Tudo Certo!',
                        message: 'Cadastro realizado com sucesso!',
                        type: 'success'
                    })

                    return router.push(`/authentication`);
                } else {
                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro.',
                        message: 'Erro ao criar o usuário',
                        type: 'error'
                    })
                    return
                }
            } catch (error) {
                console.error('Erro ao verificar o usuário:', error);
                return error
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <Body>
            <div className="min-h-screen flex items-center justify-center py-8 pt-24">
                <div
                    className="z-[-1] fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-[url('/background/influencer-background.jpeg')] blur-md"
                />
                <div className="flex">
                    <Card gap={2} >
                        <CardTitle center text="Cadastre-se!" />
                        <CardText text="Preencha seus dados para se cadastrar na plataforma." />
                        <Divider />
                        <div>
                            <form className="flex gap-2 flex-col">
                                <div className="flex gap-2 mb-3">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={userRegister?.name || ''}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            placeholder="John"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={userRegister?.phone || ''}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            placeholder="123-45-678"
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-address-icon"
                                        className="block mb-2 text-sm font-medium text-gray-700">Seu e-mail</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="email"
                                            value={userRegister?.email || ''}
                                            onChange={handleChange}
                                            id="email-user"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5"
                                            placeholder="joao.silva@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-address-icon"
                                        className="block mb-2 text-sm font-medium text-gray-700">Sua senha</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password-user"
                                        value={userRegister?.password || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-2.5"
                                        placeholder="•••••••••"
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="email-address-icon"
                                        className="block mb-2 text-sm font-medium text-gray-700">Confirme sua senha</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword-user"
                                        value={userRegister?.confirmPassword || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-2.5"
                                        placeholder="•••••••••"
                                        required
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="flex gap-2 justify-center mt-3">
                            <Button secondary text="Fazer Login" onClick={() => router.push(`/authentication`)} />
                            <Button arrowIcon={!loading} isLoading={loading} text="Cadastrar" onClick={() => handleCreate()} />
                        </div>
                    </Card>

                </div>
            </div>
        </Body>
    )

}

export default Register