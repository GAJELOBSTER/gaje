export interface IRequestInit extends RequestInit {
  method?: string | undefined;
}

export default async function clientFetch(apiUrl: string, options: IRequestInit) {
  const { method, body } = options;

  const fetchURL = `${process.env.NEXT_PUBLIC_NEXT_SERVER}/api/${apiUrl}`;
  const requestOptions: IRequestInit = {
    method: `${method}`,
    body: JSON.stringify(body),
  };

  const response = await fetch(fetchURL, requestOptions);
  return response;
}
