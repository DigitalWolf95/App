type ReturnFncs<T extends Func[]> = { [K in keyof T]: ReturnType<T[K]> extends Promise<infer U> ? U | undefined : ReturnType<T[K]> | undefined };

type Func = (...args: any[]) => Promise<any>;

// TODO: make this hook use concurently await form fns lib!
export async function useConcurrentlyAwait<T extends Func[]>(...funcs: T): Promise<ReturnFncs<T>> {
  const result: any = [];
  const resultObj: Record<string, any> = {};

  const promisses = funcs.map((func, index) =>
    func()
      .then((response) => {
        resultObj[func.name] = response as any;
        result[index] = response;
      })
      .catch((error) => {
        console.error(error);
        resultObj[func.name] = undefined;
        result[index] = undefined;
      })
  );

  await Promise.all(promisses);

  return result;
}
