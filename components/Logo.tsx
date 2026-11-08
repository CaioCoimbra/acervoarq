import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="relative h-full w-max">
            <Image
                src="/momedicoes.png"
                alt="Mom Edições"
                fill
                className="object-contain relative! h-full! w-auto!"
            />
        </Link >
    )
}