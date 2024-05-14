/*
 * Flowerful runtime detour library for Creator of Another World
 */

//#region typeDefs

/**
 * @typedef Plugin
 * @property {string} GUID
 * Fill this out and make it unique.
 * Try to follow a reverse COM format or team.product schema here
 * 
 * @property {string} VERSION
 * you can put whatever you want here but keep in mind other plugins
 * may want to figure out if they know what features you offer based
 * on your version so keep it simple to understand. SemVer x.x.x
 * major.minor.release is easy to understand and parse
 * 
 * @property {string} NAME
 * This can be whatever you want.
 * 
 * @property {boolean} ENABLED
 * Flower will respect this value and refuse to load plugins that are disabled
 * 
 * @property {FlowerAPI} flower
 * Flower will pass this to your plugin in the PluginRegistered function
 * 
 * @property {LogSource} logger
 * Flower will pass this to your plugin in the PluginRegistered function
 * 
 * @property {PluginRegistered} PluginRegistered
 * Flower will call this method after your plugin is registered.
 * This is the earliest your plugin exists and because JS is async
 * there is no way to access other plugins metadata/etc here.
 * Flower and the logger are loaded. Other plugins may still be loading
 * so do not perform anything but initilization here.
 * 
 * @property {PluginAwake} PluginAwake
 * Flower will call this as a post-load event when it has finished loading
 * or disposing of all plugins. All plugin states are ready here and you
 * can depend on all other plugins being fully loaded at this point
 * 
 * @callback PluginRegistered
 * @param {FlowerAPI} flower the flower API container
 * @param {LogSource} logger your own logger
 * @returns {void}
 * 
 * @callback PluginAwake
 * @returns {void}
 */

/**
 * @typedef FlowerAPI
 * @property {RegisterPatch} RegisterPatch
 * Registers a detour to run on an object when a specific
 * method is called.
 * 
 * @property {GetGameMain} GetGameMain
 * Returns the main game object
 * 
 * @callback RegisterPatch
 * @param {object} obj
 * @param {string} methodName the name of the method to detour
 * @param {Function} patch this function will be run when the detour is called
 * @param {boolean} isPrefix
 * @returns {boolean}
 * 
 * @callback GetGameMain
 * @returns {object} tGameMain
 */

//#endregion typeDefs

//#region flower_ctor

//To communicate with the logger window
//Internal to flower only
const flower = {
    logger: {},
};

//This is what is sent to plugins when registering
/** @type FlowerAPI */
const flowerAPI =
{
    RegisterPatch: RegisterPatch,
    GetGameMain: GetGameMain,
};

var GameMain = {};

//All plugins live here
var Plugins = {};

//#endregion flower_ctor

//#region flower-core

function Init(main) {
    GameMain = main;

    main.firstLogData.events.addLog("Flower loaded");

    SetupLogger();
}

function GetGameMain() {
    return GameMain;
}

async function LoadAllPlugins() {
    const fs = require('fs');
    // eslint-disable-next-line no-undef
    const plugin_dir = nw.global.__dirname + "/gamedata/game/js/game/flower-plugins/";

    var files = fs.readdirSync(plugin_dir, {})
    WriteLog(`Loading ${files.length} plugins`);

    for (var file of files) {
        WriteLog(`File: ${file}`);
        await LoadPlugin(file);
    }

    WriteLog(`Running awakes for plugins`);

    for (var guid in Plugins) {
        Plugins[guid].PluginAwake();
    }

    //Apply patches
    for (var patch of patches) {
        Apply(patch)
    }
}

async function LoadPlugin(file) {
    const filePath = `./flower-plugins/${file}`
    WriteLog(`Importing ${filePath}`);

    try {

        /**
         * @type {Plugin}
         */
        const plugin = (await import(filePath)).Plugin;

        if (!Plugins[plugin.GUID]) {
            //Squawk
            WriteLog(`Registering ${plugin.GUID}`);

            //Check plugin is enabled
            if (!plugin.ENABLED) {
                WriteLog("Skipping, plugin is disabled");
                return;
            }

            //Store the plugin for later
            Plugins[plugin.GUID] = plugin;

            //Tell the plugin it is being registered and pass it the API/Logger
            plugin.PluginRegistered(flowerAPI, new LogSource(plugin.GUID));
        }
        else {
            throw new Error("Duplicate plugin loaded");
        }

    }
    catch (e) {
        WriteLog(`Error loading: ${e.message}`);
        return;
    }

}


/** @class LogSource */
class LogSource {

    logID = "";

    constructor(myID) {
        this.logID = myID;
    }

    /** @param {string} message  */
    write(message) {
        WriteLog(`[${this.logID}] ${message}`);
    }
}

//#endregion flower-core

//#region flower-logger

function WriteLog(message) {
    flower.logger.window.document.body.innerHTML += `<div> ${message} </div>`;
}

function SetupLogger() {
    //Logger window
    // eslint-disable-next-line no-undef
    const url = "file:///" + nw.global.__dirname + "/gamedata/game/logger.html";
    // eslint-disable-next-line no-undef
    nw.Window.open(url, {
        /*frame: debbug,*/
        width: 600,
        height: 800,
    }, function (win) {
        win.once('loaded', function () { onLoggerWindowLoaded(win) });
    });
}

function onLoggerWindowLoaded(win) {
    flower.logger = win;
    win.window.document.body.innerHTML += "<h2>Executable Started</h2>";
    win.on('data', function (data) {
        win.window.document.body.innerHTML += "<h2>" + data.message + "</h2>";
    });

    //Start patchloading here
    LoadAllPlugins();
}

//#endregion flower-logger

//#region flower-patcher

const patches = [];

function FindPatch(obj, method) {
    if (!obj[method]) {
        console.error(`Method ${method} not found on ${obj}`);
        return;
    }

    for (const patch of patches) {
        if (patch.obj === obj && patch.methodName === method) {
            return patch;
        }
    }

    const patch = {
        obj: obj,
        methodName: method,
        prefixes: [],
        postfixes: []
    }

    patches.push(patch);
    return patch;
}

function Apply(patch) {
    const orig = patch.obj[patch.methodName];

    const wrapper = function (...args) {
        WriteLog(`Running detour for ${patch.methodName}`);
        // <-- this = obj

        WriteLog(`Prefixes ${patch.prefixes.length}`);
        //patch.prefixes.forEach(prefix => prefix.call(patch.obj, ...args));
        //Allow ending the detour early
        for (patch of patch.prefixes) {
            if (false === patch.call(patch.obj, ...args)) {
                WriteLog("Ending detour");
                return;
            }
        }

        try {
            orig.call(patch.obj, ...args);
        }
        catch (e) {
            WriteLog(`Error running orig: ${e}`)
            return;
        }

        WriteLog(`Postfixes ${patch.postfixes.length}`);
        patch.postfixes.forEach(postfix => postfix.call(patch.obj, ...args));
    }

    patch.obj[patch.methodName] = wrapper.bind(patch.obj);
}

function RegisterPatch(obj, methodName, patch, isPrefix) {

    WriteLog(`Running RegisterPatch for ${methodName}`);

    const accum = FindPatch(obj, methodName);
    if (!accum) return false;

    if (isPrefix) {
        accum.prefixes.push(patch);
    }
    else {
        accum.postfixes.push(patch);
    }

    return true;
}
//#endregion flower-patcher

//Internal Context
document._flowerInt = { Init }

//global.flower = { GameExists }
//nw.flower = { GameExists }

//Verified FAKE NEWS
//window.flower = { GameExists }
//globalThis.flower = { GameExists }