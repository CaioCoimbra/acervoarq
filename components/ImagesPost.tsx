/* eslint-disable @next/next/no-img-element */
const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/043/789/153/small/beautiful-mosque-under-the-blue-sky-islamic-architecture-design-photo.jpg";

export default function ImagePost({ images }: { images?: string | null }) {
    const imageUrls = (images ?? "")
        .split(/\r?\n/)
        .map((image) => image.trim())
        .filter(Boolean);
    const image = imageUrls[0] ?? defaultImage;
    const thumbnails = imageUrls.slice(1);

    return (
        <div className="flex h-37.5 w-full md:w-2/3 pr-0 md:pr-3 justify-between md:my-0 md:h-full gap-2 md:gap-3">
            <div className={thumbnails.length ? "w-3/4" : "w-full"}>
                <img
                    src={image}
                    alt="Imagem principal do projeto"
                    className="w-full h-full rounded-lg object-cover"
                />
            </div>
            {thumbnails.length > 0 && (
                <ul aria-label="Outras imagens do projeto" className="flex w-1/4 flex-col gap-2 overflow-y-auto">
                    {thumbnails.map((url, index) => (
                        <li key={`${url}-${index}`} className="h-[30%] min-h-16 shrink-0 rounded-lg">
                            <img src={url} alt={`Imagem ${index + 2} do projeto`} className="h-full w-full rounded-lg object-cover" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
