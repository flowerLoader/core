export type Patchable = {
  [key: string]: object
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type PatchFn = (...args: any[]) => (boolean | void)

export type FlowerPatch = {
  obj: Patchable
  methodName: string
  prefixes: PatchFn[]
  postfixes: PatchFn[]
}
