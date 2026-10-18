import Post from "./Post";

export default function Main() {
    return (
        <main className="flex flex-col max-w-360 h-auto w-full my-3 mx-auto px-4">
            <h2 className="text-center text-2xl font-medium py-3 md:text-start">Inicio</h2>
            <section className="flex flex-col gap-15">
                <Post />
                <Post />
                <Post />
                <Post />
            </section>
        </main>
    )
}