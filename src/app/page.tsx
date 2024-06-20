'use client';
import Image from "next/image";
import {UserPage} from "@/components/component/userpage";
import {SpotifyLogin} from "@/components/component/spotifylogin";
import {PhantomConnect} from "@/components/component/phantomconnect";
import {CreatorPage} from "@/components/component/creatorpage";

export default function Home() {
  return (
      <CreatorPage></CreatorPage>
  );
}
