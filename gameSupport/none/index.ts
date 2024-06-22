// --- @flowerloader/types ---

import { FlowerAPI, LogSource } from "@flowerloader/api";
import { flowerCore } from "../../flowerful";

/**
 * This is how long flower waits in ms before setting up at the start
 * This will need to be configurable on a per-game basis
 */
const timeout = 10;

/**
 * This is where we store the logger window
 */
// this is jank but its how we define the window to get TS support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let logger: any = {} as { window: Window };


const flowerAPI: FlowerAPI<unknown> = {
    GetGameMain: () => { throw new Error("No game main defined") },

    // This is only used in plugins and will always throw an unused error if not ignored
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RegisterPatch(obj, methodName, patch, isPrefix)
    {
        throw new Error("Not implemented");
    },
}

const core: flowerCore<unknown> = new flowerCore(new LogSource("Flower", WriteLog, WriteDebug), flowerAPI)

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
        WriteLog(`DEBUG ${title}`, message);
}



function SetupLogger()
{
    //Logger window
    const url = "./flower/logger.html";

    const win = window.open(url, 'Logger', 'popup=1,width=600,height=800')
    win!.addEventListener('load', function ()
    {
        onLoggerWindowLoaded({
            window: win,
        });
    });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function onLoggerWindowLoaded(win: any)
{
    logger = win;
    //win.window.document.body.innerHTML += "<h2>Executable Started</h2>";

    //Goofy debug
    WriteLog("Loaded", `Loading took ${timeout}ms to finish`);

    //Start patchloading here
    core.LoadAllPlugins("./flower");
}

function trySetup()
{
    SetupLogger();
}

trySetup();

//pretty sure we don't need this
//export default function GetFlowerAPI() { return flowerAPI }