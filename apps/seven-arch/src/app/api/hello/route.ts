import { NextApiResponse } from 'next';

export async function GET(request: Request, res: NextApiResponse) {
  const js = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await js.json();

  return Response.json(json);
}
