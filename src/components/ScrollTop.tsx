"use client";
import { MdArrowUpward } from "react-icons/md"
export default function ScrollTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return(
        <div onClick={scrollToTop}>
            <div className="fixed bottom-4 right-4 z-50 bg-[#5F2EEA] text-white p-2 rounded-full shadow-[0_0_15px_rgba(95,46,234,0.4)] hover:shadow-[0_0_25px_rgba(95,46,234,0.55)] transition-shadow">
                <MdArrowUpward size={30} />
            </div>
        </div>
    )
}