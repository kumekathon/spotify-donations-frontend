'use client'
import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";


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
        router.push('/');
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
    <div>
      <p>{name.toUpperCase()}</p>
      <h3>Status - {(error?.message) ? ("Error: " + error.message) : connectionStatus}</h3>
      <h3>Address - {account ? account : "No Account Detected"}</h3>
      <h3>ChainId - {chain ? chain : 'No Chain Connected'}</h3>
      <button onClick={handleToggleConnect} disabled={false}>
        {isActive ? "Disconnect" : "Connect"}
      </button>
    </div>
  )
}