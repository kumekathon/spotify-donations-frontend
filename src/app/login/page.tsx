'use client';
import {useRouter} from "next/navigation";
import {generateRandomString} from "@/utils";
import * as querystring from "querystring";
import './login.css';
import {Button} from "@/components/ui/button";
import {getCookie, setCookie} from "cookies-next";
import {useState} from "react";

export default function LogIn() {
  const router = useRouter();
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-recently-played';

  const [isLoggedIn, setLoggedIn] = useState(getCookie('spotifyId') !== undefined);

  const handleLogOut = () => {
    setCookie('spotifyId', '');
    setCookie('spotifyToken', '');
    setCookie('spotifyRefreshToken', '');
    setLoggedIn(false);
  }

  const handleLogIn = () => {
    router.push('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_APP_ID,
        scope: scope,
        redirect_uri: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL,
        state: state
      }));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex w-full max-w-4xl gap-8 p-4 md:p-8">
        <div className="flex flex-col items-center justify-center flex-1">
          <Button onClick={isLoggedIn ? handleLogOut : handleLogIn}
            className="mt-8 bg-[#1DB954] text-white hover:bg-[#1ED760] px-12 py-2 rounded-full font-medium items-center">
            <img src="/spotifylogo.svg" alt="spotifylogo" className="w-6 h-6 mr-2"/>
            {isLoggedIn ? "Log out" : "Login with Spotify"}
          </Button>
        </div>
      </div>
    </div>
  )

}