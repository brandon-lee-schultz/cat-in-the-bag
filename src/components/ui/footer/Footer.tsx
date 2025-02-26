import React from "react"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
            <small>Created by <Link href="/credits" className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Brandon-Lee Schultz</Link></small>
        </footer>
    )
}