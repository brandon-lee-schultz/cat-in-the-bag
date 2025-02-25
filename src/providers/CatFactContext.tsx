import {createContext, useContext, useState, ReactNode, useEffect} from "react"
import {CatFact} from "@/types/CatFact"
import useGetFact from "@/hooks/useGetFact"

type CatFactContextType = {
    catFacts: CatFact[]
    removeCatFact: (index: number) => void
    isLoading: boolean
    error: Error | null
    factCount: number
}

const CatFactContext = createContext<CatFactContextType | undefined>(undefined)

type FactProviderProps = {
    children: ReactNode
    initialFacts?: CatFact[]
}

export const FactProvider = ({children, initialFacts}: FactProviderProps) => {
    const factCount = initialFacts?.length || 8

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

    return (
        <CatFactContext.Provider value={{catFacts, removeCatFact, isLoading, error, factCount}}>
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
