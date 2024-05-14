import { WriteLog } from "./flowerful";
import { FlowerPatch, Patchable, PatchFn } from "./api/FlowerPatch";

const patches: FlowerPatch[] = [];

//Apply patches
export function ApplyAllPatches()
{
    for (const patch of patches)
    {
        Apply(patch)
    }
}

function FindPatch(obj: Patchable, method: string)
{
    if (!obj[method])
    {
        console.error(`Method ${method} not found on ${obj}`);
        return;
    }

    for (const patch of patches)
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
        postfixes: []
    }

    patches.push(patch);
    return patch;
}

function Apply(patch: FlowerPatch)
{
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    const orig = patch.obj[patch.methodName] as Function;

    const wrapper: PatchFn = function (...args)
    {
        WriteLog("Flower", `Running detour for ${patch.methodName}`);
        // <-- this = obj

        WriteLog("Flower", `Prefixes ${patch.prefixes.length}`);
        //patch.prefixes.forEach(prefix => prefix.call(patch.obj, ...args));
        //Allow ending the detour early
        for (const prefix of patch.prefixes)
        {
            if (false === prefix.call(patch.obj, ...args))
            {
                WriteLog("Flower", "Ending detour");
                return;
            }
        }

        try
        {
            orig.call(patch.obj, ...args);
        }
        catch (e)
        {
            WriteLog("Flower", `Error running orig: ${e}`)
            return;
        }

        WriteLog("Flower", `Postfixes ${patch.postfixes.length}`);
        patch.postfixes.forEach(postfix => postfix.call(patch.obj, ...args));
    }

    patch.obj[patch.methodName] = wrapper.bind(patch.obj);
}

export function RegisterPatch(obj: Patchable, methodName: string, patch: PatchFn, isPrefix: boolean)
{

    WriteLog("Flower", `Running RegisterPatch for ${methodName}`);

    const accum = FindPatch(obj, methodName);
    if (!accum) return false;

    if (isPrefix)
    {
        accum.prefixes.push(patch);
    }
    else
    {
        accum.postfixes.push(patch);
    }

    return true;
}