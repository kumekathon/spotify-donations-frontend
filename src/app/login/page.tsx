'use client';
import {useRouter} from "next/navigation";
import {generateRandomString} from "@/utils";
import * as querystring from "querystring";
import './login.css';

export default function LogIn() {
  const router = useRouter();
  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email user-read-recently-played';

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

  return <>
    <div className="flex min-h-screen min-w-full justify-center">
      <button className={"spotify-login-button"} onClick={handleLogIn}>Log In</button>
    </div>
  </>

}