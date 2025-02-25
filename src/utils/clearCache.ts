import refresh from "@/utils/refresh";

export default function clearCache() {
    localStorage.removeItem("cat_facts")
    refresh()
}