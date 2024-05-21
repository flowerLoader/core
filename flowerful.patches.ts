import { LogSource } from "@flowerloader/api";
import { FlowerPatch, Patchable, PatchFn } from "@flowerloader/api/FlowerPatch";

export class flowerPatcher
{
    Patches: FlowerPatch[] = [];
    MyLogSource: LogSource;


    //Apply patches
    ApplyAllPatches()
    {
        for (const patch of this.Patches)
        {
            this.Apply(patch)
        }
    }

    FindPatch(obj: Patchable, method: string)
    {
        if (!obj[method])
        {
            console.error(`Method ${method} not found on ${obj}`);
            return;
        }

        for (const patch of this.Patches)
        {
            if (patch.obj === obj && patch.methodName === method)
            {
                return patch;
            }
        }

        const patch: FlowerPatch = {
            obj: obj,
            methodName: method,
            prefixes: [],
            postfixes: [],
            applied: false,
        }

        this.Patches.push(patch);
        return patch;
    }

    /**
     * Binds a patch to an object. All patches are accumulated even after initial binding.
     * @param patch 
     * @returns false if this patch has already been bound
     */
    Apply(patch: FlowerPatch): boolean
    {

        /** Only apply patches once ever */
        if (patch.applied)
            return false;

        /* eslint-disable-next-line @typescript-eslint/ban-types */
        const orig = patch.obj[patch.methodName] as Function;
        const Patcher = this;

        const wrapper: PatchFn = function (...args)
        {
            Patcher.MyLogSource.writeDebug(`Running detour for ${patch.methodName}`);
            // <-- this = obj

            patch = Patcher.FindPatch(patch.obj, patch.methodName)!;

            Patcher.MyLogSource.writeDebug(`Prefixes ${patch.prefixes.length}`);
            //patch.prefixes.forEach(prefix => prefix.call(patch.obj, ...args));
            //Allow ending the detour early
            for (const prefix of patch.prefixes)
            {
                if (false === prefix.call(patch.obj, ...args))
                {
                    Patcher.MyLogSource.writeDebug("Ending detour");
                    return;
                }
            }

            let origRet;

            try
            {
                origRet = orig.call(patch.obj, ...args);
            }
            catch (e)
            {
                Patcher.MyLogSource.write(`Error running orig: ${e}`)
                return;
            }

            /**
             * Todo: allow postfixes to modify the return data here
             */

            Patcher.MyLogSource.writeDebug(`Postfixes ${patch.postfixes.length}`);

            for (const postfix of patch.postfixes)
            {
                try
                {
                    postfix.call(patch.obj, ...args)
                }
                catch (e: any)
                {
                    Patcher.MyLogSource.write(`Failed to run postfix: ${e.message}`);
                }
            }


            return origRet;
        }

        patch.obj[patch.methodName] = wrapper.bind(patch.obj);
        return true;
    }

    /**
     * Registers a new patch with flower
     * @param obj any object that contains a method
     * @param methodName the string name of the method to patch
     * @param patch a function that runs when the method is called
     * @param isPrefix if this should run before the method (afterward otherwise)
     * @returns true on success
     */
    RegisterPatch(obj: Patchable, methodName: string, patch: PatchFn, isPrefix: boolean)
    {

        this.MyLogSource.writeDebug(`Running RegisterPatch for ${methodName}`);

        const accum = this.FindPatch(obj, methodName);
        if (!accum) return false;

        if (isPrefix)
        {
            accum.prefixes.push(patch);
        }
        else
        {
            accum.postfixes.push(patch);
        }

        this.Apply(accum);
        return true;
    }

    constructor(LogSource: LogSource)
    {
        this.MyLogSource = LogSource;
    }
}