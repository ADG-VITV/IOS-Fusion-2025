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
            <div className="fixed bottom-4 right-4 bg-[#5F2EEA] text-white p-2 rounded-full">
                <MdArrowUpward size={30} />
            </div>
        </div>
    )
}