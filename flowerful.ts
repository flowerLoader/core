/*
 * Flowerful runtime detour library for Creator of Another World
 */

import { FlowerAPI } from "@flowerloader/api/FlowerAPI";
import { FlowerPlugin } from "@flowerloader/api/FlowerPlugin"
import { LogSource } from "@flowerloader/api/logSource";
import { ApplyAllPatches, RegisterPatch } from "./flowerful.patches";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
declare const nw: any;

//#region flower_ctor

//To communicate with the logger window
//Internal to flower only
const flower = {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    logger: {} as any,
};

//This is what is sent to plugins when registering
const flowerAPI: FlowerAPI =
{
    RegisterPatch: RegisterPatch,
    GetGameMain: GetGameMain,
};

let GameMain = {};

//All plugins live here
const Plugins: { [key: string]: FlowerPlugin } = {};

//#endregion flower_ctor

//#region flower-core

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function Init(main: any)
{
    GameMain = main;

    main.firstLogData.events.addLog("Flower loaded");

    SetupLogger();
}

function GetGameMain()
{
    return GameMain;
}

async function LoadAllPlugins()
{
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const fs = require('fs');
    const plugin_dir = nw.global.__dirname + "/gamedata/game/js/game/flower-plugins/";

    const files = fs.readdirSync(plugin_dir, {})
    WriteLog("Flower", `Loading ${files.length} plugins`);

    for (const file of files)
    {
        WriteLog("Flower", `File: ${file}`);
        await LoadPlugin(file);
    }

    WriteLog("Flower", `Running awakes for plugins`);

    for (const guid in Plugins)
    {
        Plugins[guid].PluginAwake();
    }

    ApplyAllPatches();
}

async function LoadPlugin(file: string)
{
    const filePath = `./flower-plugins/${file}`
    WriteLog("Flower", `Importing ${filePath}`);

    try
    {

        /**
         * @type {Plugin}
         */
        const plugin = (await import(filePath)).Plugin;

        if (!Plugins[plugin.GUID])
        {
            //Squawk
            WriteLog("Flower", `Registering ${plugin.GUID}`);

            //Check plugin is enabled
            if (!plugin.ENABLED)
            {
                WriteLog("Flower", "Skipping, plugin is disabled");
                return;
            }

            //Store the plugin for later
            Plugins[plugin.GUID] = plugin;

            //Tell the plugin it is being registered and pass it the API/Logger
            plugin.PluginRegistered(flowerAPI, new LogSource(plugin.GUID, WriteLog));
        }
        else
        {
            throw new Error("Duplicate plugin loaded");
        }

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

export function WriteLog(title: string, message: string)
{

    flower.logger.window.document.body.innerHTML +=
        `<div class="log-entry">
	        <div class="head">${title}</div>
	        <div class="body">${message}</div>
        </div>`;

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

//Internal Context
document._flowerInt = { Init }

//global.flower = { GameExists }
//nw.flower = { GameExists }

//Verified FAKE NEWS
//window.flower = { GameExists }
//globalThis.flower = { GameExists }
