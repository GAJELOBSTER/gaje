export interface IRequestInit extends RequestInit {
  method?: string | undefined;
}

export default async function clientFetch(apiUrl: string, options: IRequestInit) {
  const fetchURL = `${process.env.NEXT_PUBLIC_NEXT_SERVER}/api/interceptor`;

  const requestOptions: IRequestInit = {
    method: "POST",
    body: JSON.stringify({ apiUrl, options }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(fetchURL, requestOptions);

  if (response.redirected) return window.location.replace(response.url);

  return response;
}
