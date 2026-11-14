import { useState, useEffect } from "react";
import { IconGear } from "./Icons";

export default function Accessibilities() {
    const [ativado, setAtivado] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
        
        setIsDarkMode(prefersDark);
        if (prefersDark) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const handleDarkModeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isDark = e.target.checked;
        setIsDarkMode(isDark);
        
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <>
            <div className="cursor-pointer relative" onClick={() => setAtivado(!ativado)}>
                {IconGear}
            </div>
            
            <div className={`${ativado ? 'absolute flex' : 'hidden'} flex-col h-50 w-50 px-3 py-2 gap-3 bg-zinc-900/95 backdrop-blur-lg top-[4vh] -right-5 z-50`} onMouseLeave={() => setAtivado(false)}>
                <h3>Acessibilidades</h3>
                <ul>
                    <li className="flex items-center justify-between">
                        <h4>Dark Mode</h4>
                        <input
                            className="appearance-none bg-zinc-300 h-4 w-4 rounded-full checked:bg-green-600 cursor-pointer transition-colors"
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={handleDarkModeToggle}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}