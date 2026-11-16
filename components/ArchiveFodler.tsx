import ArchiveItem from "./ArchiveItem";
import { IconFile, IconFolder } from "./Icons";

export default function ArchiveFolder() {
    const divStyle = 'aspect-square flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 rounded-lg cursor-pointer hover:opacity-85'
    
    return (
        <div className="w-full">
            <ul className="w-full grid grid-cols-9 gap-3">
                <ArchiveItem>
                    <div className={divStyle}>
                        {IconFile}
                    </div>
                    <h4>Arquivo Tal</h4>
                </ArchiveItem>
                <ArchiveItem>
                    <div className={divStyle}>
                        {IconFolder}
                    </div>
                    <h4>Pasta Sobre</h4>
                </ArchiveItem>
            </ul>
        </div>
    )
}