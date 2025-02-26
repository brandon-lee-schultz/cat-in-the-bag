import {useCallback, useEffect, useState} from "react"
import {CatFact} from "@/types/CatFact"
import {useCatFacts} from "@/providers/CatFactContext"

type useFactCardProps = {
    index: number
}

type UseFactCard = {
    text: string
    isEnabled: boolean
    onTextChange(newText: string): void
    onEditClick(): void
    onSaveClick(): void
    catFact: CatFact
    removeCatFact(id: number): void
}

export default function useFactCard({index}: useFactCardProps): UseFactCard {
    const {catFacts, removeCatFact, saveCatFact} = useCatFacts()
    const catFact = catFacts[index]

    const [text, setText] = useState(catFact?.fact)
    const [originalFact, setOriginalFact] = useState<string>(catFact?.fact)
    const [isEnabled, setIsEnabled] = useState<boolean>(false)

    const onTextChange = useCallback((newText: string) => {
        setText(newText)
    }, [])

    const onEditClick = useCallback(() => {
        setIsEnabled(!isEnabled)
        setText(originalFact)
    }, [isEnabled, originalFact])

    const onSaveClick = useCallback(() => {
        setIsEnabled(false)
        setOriginalFact(text)

        saveCatFact(index, text)
    }, [index, saveCatFact, text])

    useEffect(() => {
        setText(catFact.fact)
        setOriginalFact(catFact.fact)
    }, [catFact])


    return {
        text,
        isEnabled,
        onTextChange,
        onEditClick,
        onSaveClick,
        catFact,
        removeCatFact
    }
}