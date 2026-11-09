import TextPostBottom from "./TextPostBottom";
import TextPostTop from "./TextPostTop";
import type { FeedPost } from "../types/Post";

export default function TextPost({ post }: { post?: FeedPost }) {

    return (
        <div className="flex flex-col h-full justify-between w-1/3 gap-1.5">
            <TextPostTop nome={post?.nome} autores={post?.autores} />
            <TextPostBottom post={post} />
        </div>
    )
}
