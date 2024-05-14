import { PatchFn, Patchable } from "./FlowerPatch"

export type FlowerAPI = {
  /**
   * Register a patch for a method on an object with a prefix or postfix
   * @param obj
   * @param methodName - The name of the method to patch
   * @param patch      - The function to run as a detour
   * @param isPrefix   - If true, the patch will run before the original method
   * @returns {boolean}
   */
  RegisterPatch: (obj: Patchable, methodName: string, patch: PatchFn, isPrefix: boolean) => boolean

  // Returns the main game object
  GetGameMain: () => any
}
