import Link from "next/link";
import { Dollar, Plus } from "./Icons";

export default function Footer({ className = "" }) {
    return (
        <footer className={`${className} bg-gray-950 text-center text-sm flex justify-around items-center text-white`}>
            <Link href="/" className="w-[40%] h-[80%] bg-amber-800 text-[#807f7f] rounded-full flex justify-center items-center">
                <Plus className='w-14' />
            </Link>

            <Link href="/expenses" className="w-[40%] h-[80%] bg-red-800 text-[#807f7f] rounded-full flex justify-center items-center" >
                <Dollar />
            </Link>
        </footer>
    );
}