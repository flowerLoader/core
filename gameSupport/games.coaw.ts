// --- @flowerloader/types ---

import { FlowerAPI, LogSource } from "@flowerloader/api";
import { GameDataCOAW, tGameMain } from "@flowerloader/coawtypes";
import { flowerCore } from "../flowerful";

/**
 * This is how long flower waits in ms before setting up at the start
 * This will need to be configurable on a per-game basis
 */
const timeout = 100;

/**
 * This is where we store the logger window for coaw
 */
let logger: any = {} as { window: Window };

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
declare const nw: any;
declare const tWgm: tGameMain;

const flowerAPI: FlowerAPI<GameDataCOAW> = {
    GetGameMain: () => { return { tGameMain: tWgm } },
    RegisterPatch(obj, methodName, patch, isPrefix)
    {
        throw new Error("Not implemented");
    },
}

let core: flowerCore<GameDataCOAW> = new flowerCore(new LogSource("Flower", WriteLog, WriteDebug), flowerAPI)

function WriteLog(title: string, message: string)
{

    const logBody = logger.window.document.getElementById("log-body");
    const el = logger.window.document.createElement("div");
    el.className = "log-entry"
    el.innerHTML = `<div class="head">${title}</div>
                        <div class="body">${message}</div>`;

    logBody?.insertBefore(el, logBody.firstChild)
}

function WriteDebug(title: string, message: string)
{
    if (core.Debug)
        WriteLog("DEBUG ${title}", message);
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
        win.once('loaded', function ()
        {
            onLoggerWindowLoaded(win);
        });
    });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function onLoggerWindowLoaded(win: any)
{
    logger = win;
    //win.window.document.body.innerHTML += "<h2>Executable Started</h2>";

    //Start patchloading here
    core.LoadAllPlugins(nw.global.__dirname + "/gamedata/game/js/game");
}

window.onload = function ()
{
    window.setTimeout(() =>
    {
        SetupLogger();
    }, timeout);
};

export default function GetFlowerAPI() { return flowerAPI }