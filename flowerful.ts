/*
 * Flowerful runtime detour library for Creator of Another World
 */

import { FlowerAPI, IFlowerPlugin, isModule, LogSource } from "@flowerloader/api";
import { flowerPatcher } from "./flowerful.patches";

/* Set this to true to get ALL the spammy log messages */
const debuglogging = false;

type LogCallback = (title: string, message: string) => void;

export class flowerCore<T>
{
    //All the plugins live here
    Plugins: { [key: string]: IFlowerPlugin } = {};
    MyLogSource: LogSource;
    Patcher: flowerPatcher;
    API: FlowerAPI<T>;
    Debug: boolean = debuglogging;

    async LoadAllPlugins(plugin_root: string): Promise<void>
    {
        /* eslint-disable-next-line @typescript-eslint/no-var-requires */
        const fs = require('fs');
        const plugin_dir = `${plugin_root}/flower-plugins/`;

        const files = fs.readdirSync(plugin_dir, {})
        this.MyLogSource.writeDebug(`Loading ${files.length} plugins`);

        for (const file of files)
        {
            this.MyLogSource.writeDebug(`Loading File: ${file}`);
            await this.LoadPlugin(file);
        }

        this.MyLogSource.writeDebug(`Running awakes for plugins`);

        for (const guid in this.Plugins)
        {
            try
            {
                this.Plugins[guid].Awake();
            } catch (e: any)
            {
                this.MyLogSource.write(`Error loading ${guid}: ${e.message}`);
                delete this.Plugins[guid];
                //Strech goals: Delete patches from bad boys that fail on Awake()
            }

        }

        //This should be completely redundant now
        this.Patcher.ApplyAllPatches();
    }

    async LoadPlugin(file: string): Promise<void>
    {
        const filePath = `./flower-plugins/${file}`
        this.MyLogSource.write(`Importing ${filePath}`);

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
                    this.MyLogSource.writeDebug(`Registering ${meta.GUID}`);

                    //Check plugin is enabled
                    if (!meta.ENABLED)
                    {
                        this.MyLogSource.writeDebug("Skipping, plugin is disabled");
                        return;
                    }

                    //Where the magic happens
                    const plugin = new pluginConstructor(this.API, new LogSource(meta.GUID, this.MyLogSource.writer, this.MyLogSource.debugWriter));

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
            this.MyLogSource.write(`Error loading: ${e.message}`);
            return;
        }

    }

    constructor(LogSource: LogSource, API: FlowerAPI<T>)
    {
        this.MyLogSource = LogSource;
        this.Patcher = new flowerPatcher(this.MyLogSource);

        //API nonsense
        API.RegisterPatch = this.Patcher.RegisterPatch;
        this.API = API;
    }
}