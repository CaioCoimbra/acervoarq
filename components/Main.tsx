export const Main = (props: { title?: string; children?: React.ReactNode }) => {
    return (
        <main className="flex flex-col max-w-360 h-auto w-full my-3 mx-auto px-4">
            <h2 className="text-center text-2xl font-medium py-3 md:text-start">{props.title}</h2>
            <section className="flex flex-col gap-8 md:gap-15">
                {props.children}
            </section>
        </main>
    )
}
