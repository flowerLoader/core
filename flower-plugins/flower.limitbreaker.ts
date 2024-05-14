/*
 * A simple patch to expose the game's limits and allow tweaking them
 */

import { FlowerPlugin } from "../api/FlowerPlugin";
import { FlowerAPI } from "../api/FlowerAPI";
import { LogSource } from "../api/logSource";

export const Plugin: FlowerPlugin & {
    CONFIG: { MaxPartySize: number }
} =
{

    GUID: "flowerteam.limitbreaker",

    VERSION: "1.0.0",

    NAME: "Limit Breaker",

    ENABLED: true,

    flower: {} as FlowerAPI,
    logger: {} as LogSource,

    CONFIG:
    {
        //Default: 5
        MaxPartySize: 10,
    },

    PluginRegistered: function (flower, logger)
    {
        this.flower = flower;
        this.logger = logger;
        this.logger.write("Loaded");
    },

    PluginAwake: function ()
    {
        this.logger.write("Setting limits");

        //Change some values
        this.flower.GetGameMain().tGameCharactor.playerTeamMemberLimitNum = this.CONFIG.MaxPartySize;
    },

}