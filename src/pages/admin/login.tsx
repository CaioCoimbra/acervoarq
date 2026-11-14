import Header from "../../../components/Header";

export default function Login() {
    return (
        <div className="flex flex-col h-screen bg-zinc-100 dark:bg-zinc-800">
            <Header />
            <main className="flex flex-col justify-center max-w-150 flex-1 w-full my-3 mx-auto px-4 gap-8">
                <div className="flex flex-col justify-between bg-white dark:bg-zinc-700 rounded-2xl py-8 px-4 h-110 gap-8">
                    <h2 className="text-center text-2xl font-medium md:text-start">Login</h2>
                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="" className="text-xl">Email</label>
                            <input type="email" className="bg-zinc-200 rounded-lg text-xl pl-3 py-1.5 text-black" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="" className="text-xl">Senha</label>
                            <input type="password" className="bg-zinc-200 rounded-lg text-xl pl-3 py-1.5 text-black" />
                        </div>
                    </section>
                    <button className="bg-black text-white font-semibold py-2 rounded-xl">Entrar</button>
                </div>
            </main >
            <span className="block h-[6vh]" />
        </div>
    )
}