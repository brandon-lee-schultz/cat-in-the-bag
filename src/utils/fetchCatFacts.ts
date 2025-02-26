type fetchCatFactsProps = {
    factCount: number
}

export default async function fetchCatFacts({factCount}: fetchCatFactsProps) {
    const requests = Array.from({length: factCount}, () =>
        fetch("https://catfact.ninja/fact?max_length=140").then((res) => {
            if (!res.ok) throw new Error("Failed to fetch cat facts")
            return res.json()
        })
    )

    return Promise.all(requests)
}