import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import HeaderSearch from "./HeaderSearch"
import Logo from "./Logo"
import Nav from "./Nav"

export default function Header({ authenticated = false }: { authenticated?: boolean }) {
    const router = useRouter()
    const [logoutError, setLogoutError] = useState("")

    async function logout() {
        setLogoutError("")
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" })
            if (!response.ok) throw new Error("logout failed")
            await router.replace("/admin/login")
        } catch {
            setLogoutError("Não foi possível sair. Tente novamente.")
        }
    }

    return (
        <>
            <header className="flex fixed top-0 h-[6vh] w-full bg-linear-to-br bg-zinc-900 text-[#BABABA]">
                <div className="flex flex-row items-center justify-between max-w-360 w-full mx-auto py-2 px-4">
                    <Logo />
                    <Nav />
                    <details className="relative ml-auto md:ml-0">
                        <summary className="cursor-pointer list-none rounded-lg border border-zinc-600 px-3 py-1 hover:text-white">
                            {authenticated ? "Conta" : "Menu"}
                        </summary>
                        <div className="absolute right-0 z-20 mt-2 flex min-w-44 flex-col gap-3 rounded-lg bg-zinc-900 p-4 shadow-xl">
                            {authenticated ? (
                                <>
                                    <Link href="/admin/post">Novo projeto</Link>
                                    <button type="button" onClick={logout} className="text-left">Sair</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/admin/login">Entrar</Link>
                                    <Link href="/admin/register">Criar conta</Link>
                                    <Link href="/admin/post">Novo projeto</Link>
                                </>
                            )}
                            {logoutError && <span role="alert" className="text-sm text-red-300">{logoutError}</span>}
                        </div>
                    </details>
                    <HeaderSearch />
                </div>
            </header>
            <span className="block h-[6vh]" />
        </>
    )
}
