/*
 * Flowerful runtime detour library for Creator of Another World
 */

import { FlowerAPI, FlowerModule, IFlowerPlugin, isModule, LogSource } from "@flowerloader/api";
import { RegisterPatch, ApplyAllPatches } from "./flowerful.patches";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
declare const nw: any;

/* Set this to true to get ALL the spammy log messages */
const debuglogging = false;

//#region flower_ctor

//To communicate with the logger window
//Internal to flower only
const flower = {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    logger: {} as { window: Window },
};

//This is what is sent to plugins when registering
const flowerAPI: FlowerAPI =
{
    RegisterPatch: RegisterPatch,
    GetGameMain: GetGameMain,
};

//All plugins live here
const Plugins: { [key: string]: IFlowerPlugin } = {};

//#endregion flower_ctor

//#region flower-core

function GetGameMain()
{
    //@ts-ignore
    return tWgm;
}

async function LoadAllPlugins()
{
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const fs = require('fs');
    const plugin_dir = nw.global.__dirname + "/gamedata/game/js/game/flower-plugins/";

    const files = fs.readdirSync(plugin_dir, {})
    WriteDebug(`Loading ${files.length} plugins`);

    for (const file of files)
    {
        WriteDebug(`Loading File: ${file}`);
        await LoadPlugin(file);
    }

    WriteDebug(`Running awakes for plugins`);

    for (const guid in Plugins)
    {
        try
        {
            Plugins[guid].Awake();
        } catch (e: any)
        {
            WriteLog("Flower", `Error loading ${guid}: ${e.message}`);
            delete Plugins[guid];
            //Strech goals: Delete patches from bad boys that fail on Awake()
        }

    }

    ApplyAllPatches();
}

async function LoadPlugin(file: string)
{
    const filePath = `./flower-plugins/${file}`
    WriteLog("Flower", `Importing ${filePath}`);

    try
    {

        const maybePlugin = (await import(filePath));

        if (isModule(maybePlugin))
        {

            const {
                META: meta, default: pluginConstructor
            } = maybePlugin;

            if (!Plugins[meta.GUID])
            {
                //Squawk
                WriteDebug(`Registering ${meta.GUID}`);

                //Check plugin is enabled
                if (!meta.ENABLED)
                {
                    WriteDebug("Skipping, plugin is disabled");
                    return;
                }

                //Where the magic happens
                const plugin = new pluginConstructor(flowerAPI, new LogSource(meta.GUID, WriteLog));

                Plugins[meta.GUID] = plugin;

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
        WriteLog("Flower", `Error loading: ${e.message}`);
        return;
    }

}

//#endregion flower-core

//#region flower-logger

export function WriteDebug(message: string)
{
    if (!debuglogging)
        return;

    WriteLog("Flower Debug", message);
}

export function WriteLog(title: string, message: string)
{

    const logBody = flower.logger.window.document.getElementById("log-body");
    const el = flower.logger.window.document.createElement("div");
    el.className = "log-entry"
    el.innerHTML = `<div class="head">${title}</div>
                        <div class="body">${message}</div>`;

    logBody?.insertBefore(el, logBody.firstChild)

}

function SetupLogger()
{
    //Logger window
    const url = "file:///" + nw.global.__dirname + "/gamedata/game/logger.html";
    nw.Window.open(url, {
        /*frame: debbug,*/
        width: 600,
        height: 800,
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    }, function (win: any)
    {
        win.once('loaded', function () { onLoggerWindowLoaded(win) });
    });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function onLoggerWindowLoaded(win: any)
{
    flower.logger = win;
    //win.window.document.body.innerHTML += "<h2>Executable Started</h2>";

    //Start patchloading here
    LoadAllPlugins();
}

//#endregion flower-logger

window.onload = function ()
{
    SetupLogger();
};