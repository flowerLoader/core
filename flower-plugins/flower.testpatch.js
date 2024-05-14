/*
Flower plugin example/template
*/

/** @type {import("../flowerful").Plugin} */
export const Plugin =
{
    GUID: "flowerteam.testpatch",

    VERSION: "1.0.0",

    NAME: "Test Patch Plugin",

    ENABLED: false,

    flower: {},
    logger: {},

    PluginRegistered: function (flower, logger) {
        this.flower = flower;
        this.logger = logger;
        this.logger.write("Loaded");
    },

    PluginAwake: function () {
        this.logger.write("Awake");

        //for the enclosed functions
        var logger = this.logger;

        // eslint-disable-next-line no-unused-vars
        this.flower.RegisterPatch(this.flower.GetGameMain(), "startNewGame", function (a, b, c) {
            logger.write(`Postfix!`);
        }, false);

        // eslint-disable-next-line no-unused-vars
        this.flower.RegisterPatch(this.flower.GetGameMain(), "startNewGame", function (a, b, c) {
            logger.write("Prefix!");
            logger.write()
        }, true);
    },

}