import React from "react"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
            <small>Created by <Link href="/credits">Brandon-Lee Schultz</Link></small>
        </footer>
    )
}