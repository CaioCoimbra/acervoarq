import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";

export default function TextPost() {

    return (
        <div className="flex flex-col h-full justify-between w-1/3 gap-1.5">
            <TextPostTop />
            <TextPostBottom />
        </div>
    )
}