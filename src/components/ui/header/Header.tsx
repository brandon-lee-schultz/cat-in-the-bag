import React from "react"

type HeaderProps = {
    title: string
    titleSubpart?: string
}

export default function Header({title, titleSubpart}: HeaderProps) {
    return (
        <div className="mt-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{title} </span> {titleSubpart}
            </h1>
        </div>
    )
}