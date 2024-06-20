'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {getCookie} from "cookies-next";

export default function Home() {
  const router = useRouter();
  const spotifyId = getCookie('spotifyId')?.toString();
  useEffect(() => {
    if (spotifyId) {
      router.push('/dashboard');
      return;
    }
    router.push('/login');
  }, []);
  return <div>Redirecting...</div>
}
