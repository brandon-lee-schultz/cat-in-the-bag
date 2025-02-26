import React from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import useFactCard from "@/components/ui/fact-card/useFactCard"

type FactCardProps = {
    index: number
}

export default function FactCard({index}: FactCardProps) {
    const {text, isEnabled, onTextChange, onEditClick, onSaveClick, catFact, removeCatFact} = useFactCard({index})
    const actionEditButtonTitle = isEnabled ? 'Cancel' : 'Edit'

    return (
        <div className="m-2">
            <Card data-testid="fact-item" className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">Cat Fact {index}</CardTitle>
                    <CardDescription className="text-center">An interesting fact about a cat with a length
                        of {catFact?.length} characters</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow min-h-[120px] flex items-center justify-center text-center mb-5">
                    <Textarea
                        className="resize-none min-h-[120px] disabled:text-red-500"
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        disabled={!isEnabled}/>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={onEditClick}>{actionEditButtonTitle}</Button>
                    {isEnabled && <Button variant="default" onClick={onSaveClick}>Save</Button>}
                    <Button variant="ghost" className="bg-red-500 text-white"
                            onClick={() => removeCatFact(index)}>Delete</Button>
                </CardFooter>
            </Card>
        </div>
    )
}