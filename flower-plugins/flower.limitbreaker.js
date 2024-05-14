/*
 * A simple patch to expose the game's limits and allow tweaking them
 */

/** @type {import("../flowerful").Plugin} */
export const Plugin =
{

    GUID: "flowerteam.limitbreaker",

    VERSION: "1.0.0",

    NAME: "Limit Breaker",

    ENABLED: true,

    flower: {},
    logger: {},

    CONFIG:
    {
        //Default: 5
        MaxPartySize: 10,
    },

    PluginRegistered: function (flower, logger) {
        this.flower = flower;
        this.logger = logger;
        this.logger.write("Loaded");
    },

    PluginAwake: function () {
        this.logger.write("Setting limits");

        //Change some values
        this.flower.GetGameMain().tGameCharactor.playerTeamMemberLimitNum = this.CONFIG.MaxPartySize;
    },

}