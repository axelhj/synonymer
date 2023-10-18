const postJson = async (url: string, body: object) => {
  const headers = new Headers();
  headers.append("content-type", "application/json");
  return await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
};

export default postJson;
