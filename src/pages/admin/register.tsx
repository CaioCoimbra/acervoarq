import { useState, type FormEvent } from "react";
import Link from "next/link";
import Header from "../../../components/Header";

export default function Register() {
    const [error, setError] = useState("");
    const [created, setCreated] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });
            const result = await response.json() as { error?: string };
            if (!response.ok) {
                setError(result.error === "Email já cadastrado."
                    ? result.error
                    : "Não foi possível criar a conta. Verifique os dados e tente novamente.");
                return;
            }
            setCreated(true);
        } catch {
            setError("Não foi possível criar a conta. Tente novamente.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-zinc-100">
            <Header />
            <main className="mx-auto flex w-full max-w-150 flex-1 flex-col justify-center px-4 py-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl bg-white px-4 py-8">
                    <h1 className="text-center text-2xl font-medium md:text-start">Criar conta</h1>
                    {created ? (
                        <p role="status">Conta criada. <Link className="underline" href="/admin/login">Entrar</Link></p>
                    ) : (
                        <>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="register-email" className="text-xl">Email</label>
                                <input id="register-email" name="email" type="email" autoComplete="email" required className="rounded-lg bg-zinc-200 py-1.5 pl-3 text-xl" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="register-password" className="text-xl">Senha</label>
                                <input id="register-password" name="password" type="password" minLength={8} autoComplete="new-password" required className="rounded-lg bg-zinc-200 py-1.5 pl-3 text-xl" />
                            </div>
                            {error && <p role="alert" className="text-red-700">{error}</p>}
                            <button type="submit" disabled={submitting} className="rounded-xl bg-black py-2 font-semibold text-white">
                                {submitting ? "Criando conta..." : "Criar conta"}
                            </button>
                            <p className="text-center">Já tem conta? <Link className="underline" href="/admin/login">Entrar</Link></p>
                        </>
                    )}
                </form>
            </main>
        </div>
    );
}
