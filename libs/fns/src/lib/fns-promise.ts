export async function fakeAwait(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
}