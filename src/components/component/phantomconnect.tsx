/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/CCSADJ0nIY4
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { Button } from "@/components/ui/button"

export function PhantomConnect() {
    return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="flex w-full max-w-4xl gap-8 p-4 md:p-8">
                <div className="flex flex-col items-center gap-8 flex-1">
                    <Button
                        className="bg-[#1DB954] text-white hover:bg-[#1ED760] w-72 h-12 rounded-full font-medium items-center">
                        Connect wallet
                    </Button>
                    <Button
                        className="fill-none border-2 border-white text-white hover:bg-white hover:text-black w-72 h-12 rounded-full font-medium items-center">
                        Create wallet
                    </Button>
                </div>
            </div>
        </div>
    )
}