'use client'
import { useWeb3React } from "@web3-react/core";
import Card from "@/components/Card";


export default function LoginPhantom() {
  const { connector, hooks } = useWeb3React();

  return (
    <div>
      <Card connector={connector} hooks={hooks} name='phantom' />
    </div>
  );
}