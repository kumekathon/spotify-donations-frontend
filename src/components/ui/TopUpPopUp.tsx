import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {BigNumber} from "@ethersproject/bignumber";

export function TopUpPopUp() {

  const {connector, hooks} = useWeb3React();

  const {useSelectedAccount, useSelectedChainId, useSelectedIsActive, useSelectedIsActivating, useSelectedProvider} = hooks;
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const provider = useSelectedProvider(connector);

  const [error, setError] = useState<Error | undefined>(undefined)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const spotifyId = getCookie('spotifyId')?.toString();
  const router = useRouter();

  useEffect(() => {
    Promise.resolve(connector.activate(1))
      .catch((e) => {
        connector.resetState()
      }).then(() => {
    });
  }, []);

  useEffect(() => {
    if (account) {
      provider?.getBalance(account).then((balance) => {
        setBalance(balance);
      });
    }

  }, [account, isActive]);


  if (!isActive) {
    return (<div>Getting your Phantom data...</div>)
  }

  if (!spotifyId) {
    router.push('/login');
  }

  return (
    <div className="">
      <h1>Top up your account</h1>
      <p>Your Solana address: {account}</p>
      <p>Current balance: {balance.toString()} SOL</p>
      <p>Currency:</p>
      <select className="text-black">
        <option value="SOL">SOL</option>
      </select>
      <label htmlFor="amount">Amount:</label>
      <input id="amount" type="number" className="text-black"/>
    </div>
  )
}