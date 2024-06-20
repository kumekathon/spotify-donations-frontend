'use client';
import {Button} from "@/components/ui/button";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";

export default function CreatorPage() {
  const spotifyId = getCookie('spotifyId')?.toString();
  const router = useRouter();

  if (!spotifyId) {
    router.push('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex w-full max-w-4xl gap-8 p-4 md:p-8">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-9xl font-bold">100$</div>
          <div className="mt-4 text-xl text-gray-400">income this month</div>
          <Button className="mt-8 bg-[#1DB954] text-white hover:bg-[#1ED760] px-12 py-2 rounded-full font-medium">
            Withdraw
          </Button>
        </div>
        <div className="flex-1 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold">2380</div>
            <div className="mt-3 text-xl text-gray-400">listeners this month</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold mt-8">28</div>
            <div className="mt-3 text-xl text-gray-400">StreemStake users</div>
          </div>
        </div>
      </div>
    </div>
  )
}