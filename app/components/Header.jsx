import { Name } from "./Icons";

export default function Header({ className = "" }) {
    return (
        <header className={`${className} bg-red-800 text-white flex pl-3 items-center`}>
            <div className="flex items-center gap-x-2">
                <img src="/logo.png" alt="" className="w-10" />
                <Name/>
            </div>
        </header>
    );
}