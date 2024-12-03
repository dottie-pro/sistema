import { Button } from "@/components/button/Button"
import { Card, CardTitle, CardText, CardButton } from "@/components/card"
import { Divider } from "@/components/divider/Divider"
import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import React, { useState } from "react"

interface UserAuthenticationObject {
    email: string,
    password: string
}

const Authentication: React.FC = () => {

    const { handleLogin, userData, loading, setLoading, setAlertData } = useAppContext()
    const [userAuthentication, setUserAuthentication] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()

    const verifyInputs = () => {

        if (!userAuthentication || typeof userAuthentication !== 'object') {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Dados do usuário inválidos.',
                type: 'info'
            })
            return false
        }

        if (!('password' in userAuthentication) || !userAuthentication?.password || userAuthentication.password === '') {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha a password corretamente.',
                type: 'info'
            })
            return false
        }

        if (!('email' in userAuthentication) || !userAuthentication?.email || userAuthentication.email === '') {
            setAlertData({
                active: true,
                title: 'Verifique os dados.',
                message: 'Preencha o e-mail corretamente.',
                type: 'info'
            })
            return false
        }

        return true
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setUserAuthentication((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const handleAuthenticationUser = async () => {
        if (verifyInputs()) {
            setLoading(true)
            try {
                const result = await handleLogin(userAuthentication as UserAuthenticationObject)

                if (result) {
                    if (!result?.success) {
                        setAlertData({
                            active: true,
                            title: 'Ocorreu um erro.',
                            message: result?.message || 'Dados inválidos.',
                            type: 'error'
                        })
                        return
                    } else {
                        router.push('/dashboard')
                    }
                } else {
                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro.',
                        message: result?.message || 'Verifique os dados, e tente novamente.',
                        type: 'error'
                    })
                    return
                }

            } catch (error) {
                console.log(error)
                return error
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-8 pb-20">
            <div
                className="z-[-1] fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-[url('/background/influencer-background.jpeg')] blur-md"
            />
            <div className="flex">
                <Card gap={2} >
                    <CardTitle center text="Seja Bem-Vindo(a)!" />
                    <CardText text="Insira seu e-mail e senha para entrar no sistema." />
                    <Divider />
                    <div>
                        <form className="mb-6">
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
                                        value={userAuthentication?.email}
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
                                    value={userAuthentication?.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-2.5"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>

                            <span className="text-gray-700 text-light">Não possuí uma conta? <a href="/register" className="text-primary">Cadastre-se agora</a></span>
                            <span className="flex text-primary justify-center w-full mt-3">Esqueci minha senha</span>
                        </form>
                    </div>
                    <Button fullWidth arrowIcon={!loading} isLoading={loading} text="Prosseguir" onClick={() => handleAuthenticationUser()} />
                </Card>

            </div>
        </div>
    )

}

export default Authentication