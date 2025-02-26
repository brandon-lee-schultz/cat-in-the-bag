"use client"

import {createContext, useContext, useState, ReactNode, useEffect} from "react"
import {CatFact} from "@/types/CatFact"
import useGetFact from "@/hooks/useGetFact"
import {useMutation} from "@tanstack/react-query"
import fetchCatFacts from "@/utils/fetchCatFacts"

type CatFactContextType = {
    catFacts: CatFact[]
    removeCatFact(index: number): void
    saveCatFact(index: number, factText: string): void
    isLoading: boolean
    error: Error | null
    factCount: number
    fetchNewFact(newFactCount: number): void
}

const CatFactContext = createContext<CatFactContextType | undefined>(undefined)

type FactProviderProps = {
    children: ReactNode
}

export const FactProvider = ({children}: FactProviderProps) => {
    const factCount = 8

    const storedCatFacts = JSON.parse(localStorage.getItem("cat_facts") || "[]");
    const {data, isLoading, error} = useGetFact({factCount, enabled: storedCatFacts.length === 0})
    const [catFacts, setCatFacts] = useState<CatFact[]>([])

    useEffect(() => {
        if (!data) return
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

    const saveCatFact = (index: number, factText: string) => {
        setCatFacts((prevCatFacts) => {
                const updatedFacts = prevCatFacts.map((fact, i) =>
                    i === index ? {...fact, fact: factText} : fact
                )

                localStorage.setItem("cat_facts", JSON.stringify(updatedFacts))
                return updatedFacts
            }
        )
    }

    return (
        <CatFactContext.Provider
            value={{catFacts, removeCatFact, isLoading, error, factCount, fetchNewFact, saveCatFact}}>
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
