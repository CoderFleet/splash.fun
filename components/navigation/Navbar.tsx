import Logo from "../Branding/logo"
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="flex flex-row items-center justify-between px-10 py-8">
            {/* Logo */}
            <div className="flex flex-row items-center gap-4">
                <Logo className="" />
                <span className="text-white text-xl font-semibold">Splash</span>
            </div>

            {/* Side Tools */}
            <div className="text-white flex flex-row gap-4">
                <span className="font-medium text-[16px]">FAQ</span>
                <button>Connect Wallet</button>
            </div>
        </nav>
    )
}