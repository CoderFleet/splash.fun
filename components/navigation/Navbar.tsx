"use client"

import { useRouter } from "next/navigation"
import Logo from "../Branding/logo"
import ConnectWalletButton from "../Wallet/ConnectWalletButton"

export default function Navbar() {
    const router = useRouter();
    return (
        <nav className="flex flex-row items-center justify-between px-10 py-8">
            {/* Logo */}
            <div className="flex flex-row items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
                <Logo className="" />
                <span className="text-white text-xl font-semibold">Splash</span>
            </div>

            {/* Side Tools */}
            <div className="text-white flex flex-row gap-4 items-center">
                <span onClick={() => router.push('/faq')} className="cursor-pointer font-medium text-[16px]">FAQ</span>
                {/* <button>Connect Wallet</button> */}
                <ConnectWalletButton />
            </div>
        </nav>
    )
}