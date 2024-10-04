"use client";

// Next
import Image from "next/image";
import { signIn } from "next-auth/react";

// Components
import Btn from "@/components/common/Btn";

export default function LoginForm() {
  const handleFeed = async () => {
    // categories: ["일기"];
    // comments: "https://www.hyungjoo.me/%eb%8f%99%ed%98%81%ec%9d%b4/#respond";
    // content: content: encoded: content: encodedSnippet: contentSnippet: creator: "hjoo";
    // dc: creator: "hjoo";
    // guid: "https://www.hyungjoo.me/?p=10775";
    // isoDate: "2024-07-01T17:23:31.000Z";
    // link: "https://www.hyungjoo.me/%eb%8f%99%ed%98%81%ec%9d%b4/";
    // pubDate: "Mon, 01 Jul 2024 17:23:31 +0000";
    // title: "동혁이";
    const url = "https://geminikims.medium.com";
    // const url = "https://www.youtube.com/@ZeroChoTV";
    // // "https://www.hyungjoo.me/%ec%b1%85-%eb%b6%88%eb%b3%80%ec%9d%98-%eb%b2%95%ec%b9%99/";
    const response = await fetch(`/api/rss/${encodeURIComponent(url)}`);
    const data = await response.json();
    if (response.ok) {
      console.log("data", data);
    } else {
      console.log("no", data);
    }
  };

  const handleClick = async () => {
    try {
      await signIn("google", { callbackUrl: "/gaje/dashboard" });
    } catch (error) {
      throw new Error(`Login Error: ${error}`);
    }
  };

  return (
    <div>
      <div className="absolute top-2 flex gap-3">
        <Btn category="primary" outline onClick={handleFeed}>
          피드 정보 가져오기
        </Btn>
      </div>
      <div
        className="typo-body2-sb flex w-fit cursor-pointer items-center gap-3 rounded-[32px] bg-black px-8 py-5 text-white"
        onClick={handleClick}
      >
        <Image src={"/google_logo.png"} width={24} height={24} alt=""></Image>
        구글 계정으로 3초 만에 시작하기
      </div>
    </div>
  );
}
