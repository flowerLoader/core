export type Patchable = {
  [key: string]: object
}

export type PatchFn = (...args: any[]) => (boolean | void)

export type FlowerPatch = {
  obj: Patchable
  methodName: string
  prefixes: PatchFn[]
  postfixes: PatchFn[]
}
