async function getJson<T>(url: string): Promise<T> {
  const headers = new Headers();
  headers.append("accept", "application/json");
  return await (await fetch(url, {
    headers
  })).json() as T;
};

export default getJson;
