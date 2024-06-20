'use client'
import {Button} from "@/components/ui/button";
import {TopUpPopUp} from "@/components/ui/TopUpPopUp";
import {useState} from "react";

export default function UserDashboard() {
  const [topUpPopup, setTopUpPopup] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex w-full max-w-4xl gap-8 p-4 md:p-8">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-9xl font-bold">100$</div>
          <div className="mt-4 text-xl text-gray-400">stacked this month</div>
          <Button className="mt-8 bg-[#1DB954] text-white hover:bg-[#1ED760] px-12 py-2 rounded-full font-medium"
          onClick={() => setTopUpPopup((prevState) => !prevState)}>
            Top up
          </Button>
          {topUpPopup ? <TopUpPopUp/> : <></>}
        </div>
        <div className="flex-1">
          <text>tut budet diagramma</text>
        </div>
      </div>
    </div>
  )
}