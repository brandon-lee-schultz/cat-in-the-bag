"use client"

import FactCard from "@/components/ui/fact-card/FactCard"
import {SkeletonLoader} from "@/components/ui/skeleton-loader/SkeletonLoader"
import React from "react"
import {useCatFacts} from "@/providers/CatFactContext"

export default function Main() {
    const {catFacts, isLoading, error, factCount} = useCatFacts()

    return (
        (catFacts?.length === 0 && !isLoading)
            ? (
                <div className="mt-10">
                    <h1>NO MO FACTS! PLEASE REFRESH!</h1>
                </div>
            )
            : (
                <main
                    className="grid grid-cols-1 lg:grid-cols-4">
                    {(!isLoading && !error?.message)
                        ? catFacts?.map((_, index) =>
                            <FactCard key={index}
                                      index={(index)}/>)
                        : Array.from({length: factCount}).map((_, index) =>
                            <SkeletonLoader key={index}/>)
                    }

                </main>)
    )
}