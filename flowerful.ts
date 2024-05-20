/*
 * Flowerful runtime detour library for Creator of Another World
 */

import { FlowerAPI, IFlowerPlugin, isModule, LogSource } from "@flowerloader/api";
import { ApplyAllPatches } from "./flowerful.patches";

/* Set this to true to get ALL the spammy log messages */
const debuglogging = true;

export class flowerCore<T>
{
    //All the plugins live here
    Plugins: { [key: string]: IFlowerPlugin } = {};
    LogCallback: (title: string, message: string) => void;
    API: FlowerAPI<T>;

    LoadAllPlugins = async (plugin_root: string) =>
    {
        /* eslint-disable-next-line @typescript-eslint/no-var-requires */
        const fs = require('fs');
        const plugin_dir = "${plugin_root}/flower-plugins/";

        const files = fs.readdirSync(plugin_dir, {})
        this.WriteDebug(`Loading ${files.length} plugins`);

        for (const file of files)
        {
            this.WriteDebug(`Loading File: ${file}`);
            await this.LoadPlugin(file);
        }

        this.WriteDebug(`Running awakes for plugins`);

        for (const guid in this.Plugins)
        {
            try
            {
                this.Plugins[guid].Awake();
            } catch (e: any)
            {
                this.WriteMessage(`Error loading ${guid}: ${e.message}`);
                delete this.Plugins[guid];
                //Strech goals: Delete patches from bad boys that fail on Awake()
            }

        }

        //This should be completely redundant now
        ApplyAllPatches();
    }

    LoadPlugin = async (file: string) =>
    {
        const filePath = `./flower-plugins/${file}`
        this.WriteMessage(`Importing ${filePath}`);

        try
        {

            const maybePlugin = (await import(filePath));

            if (isModule(maybePlugin))
            {

                const {
                    META: meta, default: pluginConstructor
                } = maybePlugin;

                if (!this.Plugins[meta.GUID])
                {
                    //Squawk
                    this.WriteDebug(`Registering ${meta.GUID}`);

                    //Check plugin is enabled
                    if (!meta.ENABLED)
                    {
                        this.WriteDebug("Skipping, plugin is disabled");
                        return;
                    }

                    //Where the magic happens
                    const plugin = new pluginConstructor(this.API, new LogSource(meta.GUID, this.WriteMessage));

                    this.Plugins[meta.GUID] = plugin;

                }
                else
                {
                    throw new Error("Duplicate plugin loaded");
                }
            }
            else
                throw new Error("Not a valid plugin")

        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        catch (e: any)
        {
            this.WriteMessage(`Error loading: ${e.message}`);
            return;
        }

    }

    WriteMessage = (message: string) =>
    {
        this.LogCallback("Flower", message)
    }

    WriteDebug = (message: string) =>
    {
        if (!debuglogging)
            return;

        this.LogCallback("Flower Debug", message);
    }

    constructor(LogDest: (title: string, message: string) => void, API: FlowerAPI<T>)
    {
        this.LogCallback = LogDest;
        this.API = API;
    }
}