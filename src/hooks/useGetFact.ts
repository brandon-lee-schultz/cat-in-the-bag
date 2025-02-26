"use client"

import {useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import fetchCatFacts from "@/utils/fetchCatFacts"
import {CatFact} from "@/types/CatFact"

type useGetFactProps = {
    factCount: number
    clearCache?: boolean
    enabled: boolean
}

type UseGetFact = {
    data: CatFact[] | undefined
    isLoading: boolean
    error: Error | null
}

export default function useGetFact({factCount, clearCache, enabled}: useGetFactProps): UseGetFact {
    const [catFacts, setCatFacts] = useState<CatFact[] | undefined>(undefined)

    useEffect(() => {
        const items = localStorage.getItem("cat_facts")

        if (items) {
            setCatFacts(JSON.parse(items))
        }
    }, [])

    useEffect(() => {
        if (clearCache && typeof localStorage !== "undefined") {
            localStorage.removeItem("cat_facts")
        }
    }, [clearCache])

    const {data, isLoading, error} = useQuery<CatFact[]>({
        queryKey: ["cat-facts"],
        queryFn: () => fetchCatFacts({factCount}),
        enabled: enabled && !catFacts,
    })

    useEffect(() => {
        if (data && !catFacts) localStorage.setItem("cat_facts", JSON.stringify(data))
    }, [data, catFacts])

    return {
        data: catFacts ?? data,
        isLoading: isLoading && !catFacts,
        error,
    }
}
