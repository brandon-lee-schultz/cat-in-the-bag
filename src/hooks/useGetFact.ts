import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import fetchCatFacts from "@/utils/fetchCatFacts"
import { CatFact } from "@/types/CatFact"

type useGetFactProps = {
    factCount: number
    clearCache?: boolean
}

type UseGetFact = {
    data: CatFact[] | undefined
    isLoading: boolean
    error: Error | null
}

export default function useGetFact({ factCount, clearCache }: useGetFactProps): UseGetFact {
    const [localData, setLocalData] = useState<CatFact[] | undefined>(undefined)

    useEffect(() => {
        if (clearCache && typeof localStorage !== "undefined") {
            localStorage.removeItem("cat_facts")
        }

        const items = typeof localStorage !== "undefined" ? localStorage.getItem("cat_facts") : null
        if (items) {
            setLocalData(JSON.parse(items))
        }
    }, [clearCache])

    const { data, isLoading, error } = useQuery<CatFact[]>({
        queryKey: ['cat-facts'],
        queryFn: () => fetchCatFacts({ factCount }),
        enabled: !localData
    })

    useEffect(() => {
        if (data && !localData) localStorage.setItem("cat_facts", JSON.stringify(data))
    }, [data, localData])

    return {
        data: localData ?? data,
        isLoading: isLoading && localData === undefined,
        error: error,
    }
}
