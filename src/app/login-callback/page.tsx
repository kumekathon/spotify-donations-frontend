'use client';
import {useSearchParams} from "next/navigation";

export default function LoginCallback() {
  const searchParams = useSearchParams();
  return <div>{JSON.stringify(Array.from(searchParams.entries()))}</div>;
}