'use client';
import {useSearchParams, useRouter} from "next/navigation";
import {setCookie} from 'cookies-next';
import {collection, addDoc, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";
import {useEffect, useRef, useState} from "react";


export default function LoginCallback() {
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const loading = useRef(false);


  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    if (!loading.current) {
      loading.current = true;
      fetch(`/spotify-token/api?code=${code}`).then(async (response) => {
        if (!response.ok) {
          setError('Failed to get token');
          return;
        }
        const tokenData = await response.json();
        if (!tokenData.spotifyId || !tokenData.token || !tokenData.refreshToken) {
          setError('Invalid token data');
          return;
        }
        const docRef = doc(db, "users", tokenData.spotifyId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", tokenData.spotifyId), {
            email: tokenData.email,
            spotifyId: tokenData.spotifyId,
            refreshToken: tokenData.refreshToken,
            solanaAddress: '',
          });
        } else {
          await updateDoc(docRef, {
            refreshToken: tokenData.refreshToken,
          });
        }
        setCookie('spotifyToken', tokenData.token)
        setCookie('spotifyId', tokenData.spotifyId)
        setCookie('spotifyRefreshToken', tokenData.refreshToken)
        setReady(true);
      });
    }
  }, []);

  if (!searchParams) {
    return <div>Invalid auth callback data</div>;
  }
  if (searchParams.has('error')) {
    return <div>Auth error: {searchParams.get('error')}</div>;
  }

  const code = searchParams.get('code');
  if (!code) {
    return <div>Invalid auth callback data</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (ready) {
    router.push('/');
  }

}