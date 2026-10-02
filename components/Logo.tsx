import Image from "next/image";

export default function Logo() {
    return (
        <div className="relative h-full w-max">
            <Image
                src="/momedicoes.png"
                alt="Mom Edições"
                fill
                className="object-contain relative! h-full! w-auto!"
            />
        </div>
    )
}