"use client"

import React from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import App from "@/app/app"
import {FactProvider} from "@/providers/CatFactContext"

const queryClient = new QueryClient()

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <FactProvider>
                <App/>
            </FactProvider>
        </QueryClientProvider>
    )
}
