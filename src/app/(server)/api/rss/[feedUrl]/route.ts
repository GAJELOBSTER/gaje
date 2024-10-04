import Parser from "rss-parser";
import { JSDOM } from "jsdom"; // Ensure you have jsdom installed
import { NextResponse } from "next/server";

type GetPropsType = {
  params: { feedUrl: string };
};

export async function GET(req: Request, { params }: GetPropsType) {
  const { feedUrl } = params;
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const html = await response.text();
    const { document } = new JSDOM(html).window;
    const linkElement = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]',
    );
    if (linkElement) {
      const rssFeedUrl = linkElement.getAttribute("href");
      const parser = new Parser();
      const feed = await parser.parseURL(new URL(rssFeedUrl as string, feedUrl).href);
      return new Response(JSON.stringify(feed), { status: 200 });
    } else {
      return NextResponse.json({ error: "No RSS feed found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch or parse the page: ${error.message}` }, { status: 500 });
  }
}
