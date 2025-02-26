import React from "react"
import Image from 'next/image'

type HeaderProps = {
    title: string
    titleSubpart?: string
}

export default function Header({title, titleSubpart}: HeaderProps) {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <Image
                className="mb-4"
                src="/c-i-t-b.svg"
                alt="Logo"
                width={100}
                height={100}
            />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {title}
        </span>
                {titleSubpart}
            </h1>
        </div>

    )
}