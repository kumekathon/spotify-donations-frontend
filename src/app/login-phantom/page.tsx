'use client'
import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";
import {Button} from "@/components/ui/button";


export default function LoginPhantom() {

  const router = useRouter();

  const {connector, hooks} = useWeb3React();

  const name = 'Spotify donations';

  const {useSelectedAccount, useSelectedChainId, useSelectedIsActive, useSelectedIsActivating} = hooks;
  const isActivating = useSelectedIsActivating(connector)
  const isActive = useSelectedIsActive(connector)
  const account = useSelectedAccount(connector)
  const chain = useSelectedChainId(connector)

  const [error, setError] = useState<Error | undefined>(undefined)
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const spotifyId = getCookie('spotifyId')?.toString();

  useEffect(() => {
    Promise.resolve(connector.activate(1))
      .catch((e) => {
        connector.resetState()
      }).then(() => {
        setConnectionStatus('Connected')
    });
  }, []);

  useEffect(() => {
      if (isActive) {
        setConnectionStatus('Connected');
        if (!spotifyId) {
          router.push('/login');
        }

        // @ts-ignore
        const docRef = doc(db, "users", spotifyId);
        getDoc(docRef).then(async (docSnap) => {
          if (!docSnap.exists()) {
            router.push('/login');
          } else {
            await updateDoc(docRef, {
              solanaAddress: account,
            });
          }
        })
        router.push('/dashboard');
      } else {
        setConnectionStatus('Disconnected')
      }
    }, [isActive])

  if (!spotifyId) {
    router.push('/login');
  }

  const handleToggleConnect = () => {
    setError(undefined) // clear error state

    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate()
      } else {
        void connector.resetState()
      }
    } else if (!isActivating) {
      setConnectionStatus('Connecting..')
      Promise.resolve(connector.activate(1))
        .catch((e) => {
          connector.resetState()
          setError(e)
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex w-full max-w-4xl gap-8 p-4 md:p-8">
        <div className="flex flex-col items-center gap-8 flex-1">
          <Button onClick={handleToggleConnect}
            className="bg-[#1DB954] text-white hover:bg-[#1ED760] w-72 h-12 rounded-full font-medium items-center">
            Connect wallet
          </Button>
          <Button onClick={() => router.push('https://phantom.app/download')}
            className="fill-none border-2 border-white text-white hover:bg-white hover:text-black w-72 h-12 rounded-full font-medium items-center">
            Create wallet
          </Button>
        </div>
      </div>
    </div>
  )
}