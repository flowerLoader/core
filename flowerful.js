/*
 * Flowerful runtime detour library for Creator of Another World
 */

/*
 * Todo: Add a call to plugin.PluginAwake after all plugins are resolved
 */

//#region flower_ctor

//To communicate with the logger window
//Internal to flower only
const flower = {
    logger: {},
};

//This is what is sent to plugins when registering
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
}

async function LoadPlugin(file) {
    const filePath = `./flower-plugins/${file}`
    WriteLog(`Importing ${filePath}`);

    try {

        const plugin = (await import(filePath)).default;

        if (!Plugins[plugin.GUID]) {
            //Squawk
            WriteLog(`Registering ${plugin.GUID}`);
            WriteLog(`String: ${JSON.stringify(plugin)}`);
            //Store the plugin for later
            Plugins[plugin.GUID] = plugin;

            //Tell the plugin it is being registered and pass it the API/Logger
            plugin.PluginRegistered(flowerAPI, new LogSource(plugin.GUID));
        }
        else {
            throw new error("Duplicate plugin loaded");
        }

    }
    catch (e) {
        WriteLog(`Error loading: ${e.message}`);
        return;
    }

}

/*
function LoadPlugin_Old(file) {
    //load from the basedir of the DOM not the app
    const filePath = `./js/game/flower-plugins/${file}`;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
        //Plugin is loaded here
        WriteLog(`Loaded: ${filePath}`);
        script.parentNode.removeChild(script);
    };
    script.onerror = function (p) {
        //plugin has caused an error
        WriteLog(`Error: ${filePath}`);
        WriteLog(`Error code: ${p}`);
        script.parentNode.removeChild(script);
    };
    script.src = filePath;

    //Insert the completed script
    var k = document.getElementsByTagName("script")[0];
    k.parentNode.insertBefore(script, k);
}
*/

class LogSource {

    logID = "";

    constructor(myID) {
        this.logID = myID;
    }

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
    const url = "file:///" + nw.global.__dirname + "/gamedata/game/logger.html";
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

/**
 * 
 * @param {object} obj 
 * @param {string} methodName 
 * @param {function} patch 
 * @param {boolean} isPrefix 
 * @returns boolean
 */
function RegisterPatch(obj, methodName, patch, isPrefix) {

    WriteLog(`Running RegisterPatch ${obj}.${methodName}`);

    if (!obj[methodName])
        return false;

    WriteLog(`Patching proceeds on ${obj}`);

    //Check if the object has flower meta already
    if (!obj._flowerMeta) {
        obj._flowerMeta = {};
        obj._flowerMeta.origMethods = {};
        obj._flowerMeta.prefixMethods = {};
        obj._flowerMeta.postfixMethods = {};
    }

    //backup the existing method to origs but only if it doesn't real already
    if (!obj._flowerMeta.origMethods[methodName]) {
        obj._flowerMeta.origMethods[methodName] = obj[methodName];
        WriteLog(`Backing up orig`);
    }

    //write out the detour
    obj[methodName] = function (...args) {

        //debug
        WriteLog(`Running detour for ${methodName} with ${args.length} args`);

        //PreFixes
        /*
        if (prefixMethods[objName][methodName].length > 0) {
            for (patch of prefixMethods[objName][methodName]) {
                this._patchTemp = patch;
                this._patchTemp(...args);
            }
        }*/

        //run orig
        //yes this is required or it breaks
        //god I hate JavaScript
        var temp = this[methodName];
        this[methodName] = this._flowerMeta.origMethods[methodName];
        this[methodName](...args);
        this[methodName] = temp;

        WriteLog("In after orig");

        //Postfixes

        var postfixes = this._flowerMeta.postfixMethods[methodName];

        WriteLog(`Postfixes ${postfixes.length}`);

        if (postfixes.length > 0) {
            for (let i = 0; i < postfixes.length; i++) {
                postfixes[i](...args);
            }
        }
    }

    //write the patch to the correct section
    if (isPrefix) {
        //create the method prefix list if it doesn't exist
        if (!obj._flowerMeta.prefixMethods[methodName])
            obj._flowerMeta.prefixMethods[methodName] = [];

        //Add the prefix to the list
        obj._flowerMeta.prefixMethods[methodName].push(patch);
        WriteLog(`Prefix registered`);
        return true;
    }

    //create the method prefix list if it doesn't exist
    if (!obj._flowerMeta.postfixMethods[methodName])
        obj._flowerMeta.postfixMethods[methodName] = [];

    //Add the postfix to the list
    obj._flowerMeta.postfixMethods[methodName].push(patch);
    WriteLog(`Postfix registered`);
    return true;
}

//#endregion flower-patcher

//Internal Context
document._flowerInt = { Init }
//Patch Context
document.flower = { RegisterPlugin }

//global.flower = { GameExists }
//nw.flower = { GameExists }

//Verified FAKE NEWS
//window.flower = { GameExists }
//globalThis.flower = { GameExists }