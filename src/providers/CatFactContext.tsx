import {createContext, useContext, useState, ReactNode, useEffect} from "react"
import {CatFact} from "@/types/CatFact"
import useGetFact from "@/hooks/useGetFact"
import {useMutation} from "@tanstack/react-query"
import fetchCatFacts from "@/utils/fetchCatFacts"

type CatFactContextType = {
    catFacts: CatFact[]
    removeCatFact: (index: number) => void
    isLoading: boolean
    error: Error | null
    factCount: number
    fetchNewFact(newFactCount: number): void
}

const CatFactContext = createContext<CatFactContextType | undefined>(undefined)

type FactProviderProps = {
    children: ReactNode
    initialFacts?: CatFact[]
}

export const FactProvider = ({children, initialFacts}: FactProviderProps) => {
    const factCount = 8

    const {data, isLoading, error} = useGetFact({factCount})
    const [catFacts, setCatFacts] = useState<CatFact[]>(initialFacts || [])

    useEffect(() => {
        if (data && !isLoading && !error) {
            setCatFacts((prevCatFacts) => {
                if (JSON.stringify(prevCatFacts) !== JSON.stringify(data)) {
                    return data
                }
                return prevCatFacts
            })
        }
    }, [data, isLoading, error])

    const removeCatFact = (id: number) => {
        setCatFacts((prevCatFacts) => {
            const updatedFact = prevCatFacts.filter((_, i) => i !== id)
            localStorage.setItem('cat_facts', JSON.stringify(updatedFact))

            if (updatedFact.length < 1) {
                localStorage.removeItem("cat_facts")
            }

            return updatedFact
        })
    }

    const {mutate: fetchNewFact} = useMutation({
        mutationFn: (newFactCount: number) => fetchCatFacts({factCount: newFactCount}),
        onSuccess: (newFacts) => {
            const updatedFacts = [...(catFacts ?? []), ...newFacts]
            setCatFacts(updatedFacts);
            localStorage.setItem("cat_facts", JSON.stringify(updatedFacts))
        },
    })

    return (
        <CatFactContext.Provider value={{catFacts, removeCatFact, isLoading, error, factCount, fetchNewFact}}>
            {children}
        </CatFactContext.Provider>
    )
}

export const useCatFacts = (): CatFactContextType => {
    const context = useContext(CatFactContext)
    if (!context) {
        throw new Error("useCatFacts must be used within a FactProvider")
    }
    return context
}
