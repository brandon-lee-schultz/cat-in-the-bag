import React from "react";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import {Button} from "@/components/ui/button";
import clearCache from "@/utils/clearCache";
import {RefreshCcwIcon} from "lucide-react";
import refresh from "@/utils/refresh";

export default function App() {

    return (
        <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-geist-sans)] w-full">
            <Header title="CAT IN THE" titleSubpart="BAG"/>
            <div className="flex flex-row row-span-2 gap-x-4">
                <Button className="flex row-start-1" variant="destructive" onClick={clearCache}>Clear Cache</Button>
                <Button className="flex row-end-1" variant="default" onClick={refresh}><RefreshCcwIcon/></Button>
            </div>
                <Main/>
            <Footer/>
        </div>
    )
}