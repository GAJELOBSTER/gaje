// Components
import serverFetch from "@/fetch/serverFetch";

export async function POST(request: Request) {
  const { apiUrl, options } = await request.json();
  return await serverFetch(apiUrl, options);
}
