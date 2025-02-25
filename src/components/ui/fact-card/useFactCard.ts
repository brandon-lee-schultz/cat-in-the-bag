import {useCallback, useEffect, useState} from "react";
import {CatFact} from "@/types/CatFact";

type useFactCardProps = {
    catFact: CatFact
}

type UseFactCard = {
    text: string
    isEnabled: boolean
    onTextChange(newText: string): void
    onEditClick(): void
    onSaveClick(): void
}

export default function useFactCard({catFact}: useFactCardProps): UseFactCard {
    const [text, setText] = useState(catFact?.fact);
    const [originalFact, setOriginalFact] = useState<string>(catFact?.fact);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

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
    }, [text])

    useEffect(() => {
        setText(catFact.fact)
        setOriginalFact(catFact.fact)
    }, [catFact]);


    return {
        text,
        isEnabled,
        onTextChange,
        onEditClick,
        onSaveClick
    }
}