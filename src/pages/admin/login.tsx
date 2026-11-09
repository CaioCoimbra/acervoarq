import { useState, type FormEvent } from "react"
import { useRouter } from "next/router"

import Header from "../../../components/Header";
import Link from "next/link";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setSubmitting(true)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            if (response.status === 401) {
                setError("Email ou senha inválidos.")
                return
            }

            if (!response.ok) {
                setError(response.status >= 500
                    ? "O serviço está indisponível no momento. Tente novamente mais tarde."
                    : "Não foi possível entrar. Verifique os dados e tente novamente.")
                return
            }

            const returnTo = router.query?.returnTo
            const destination = typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//")
                ? returnTo
                : "/admin/post"
            await router.push(destination)
        } catch {
            setError("Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-zinc-100">
            <Header />
            <main className="flex flex-col justify-center max-w-150 flex-1 w-full my-3 mx-auto px-4 gap-8">
                <form onSubmit={handleSubmit} className="flex flex-col justify-between bg-white rounded-2xl py-8 px-4 h-110 gap-8">
                    <h2 className="text-center text-2xl font-medium md:text-start">Login</h2>
                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="login-email" className="text-xl">Login</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="username"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="bg-zinc-200 rounded-lg text-xl pl-3 py-1.5"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="login-password" className="text-xl">Senha</label>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                minLength={8}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="bg-zinc-200 rounded-lg text-xl pl-3 py-1.5"
                            />
                        </div>
                    </section>
                    {error && <p role="alert" className="text-red-700">{error}</p>}
                    <button type="submit" disabled={submitting} className="bg-black text-white font-semibold py-2 rounded-xl">
                        {submitting ? "Entrando..." : "Entrar"}
                    </button>
                    <p className="text-center">Ainda não tem conta? <Link className="underline" href="/admin/register">Criar conta</Link></p>
                </form>
            </main >
            <span className="block h-[6vh]" />
        </div>
    )
}
