import Header from "@/components/ui/header/Header"
import Link from "next/link"

export default function CreditPage() {
    return (
        <div className="flex justify-center">
            <div>
                <Header title={"CREATED BY ME, MYSELF AND I"} titleSubpart={"....Love - Brandon-Lee Schultz"}/>
                <Link href="/">Now back to the show!</Link>
            </div>
        </div>
    )
}