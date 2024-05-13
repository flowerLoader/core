/*
Flower plugin example/template
*/

export default
    {

        /*
         * fill this out and make it unique
         * try to follow a reverse COM format or team.product schema here
         */
        GUID: "flowerteam.testpatch",

        /*
         * you can put whatever you want here but keep in mind other plugins
         * may want to figure out if they know what features you offer based
         * on your version so keep it simple to understand. SemVer x.x.x
         * major.minor.release is easy to understand and parse
         */
        VERSION: "1.0.0",

        /*
         * This can be literally any string, just don't make it too long
         */
        NAME: "TestPatchPlugin",

        //Will be passed to you by flower
        flower: {},
        logger: {},

        /**
         * Flower will call this method after your plugin is registered
         * This is the earliest your plugin exists and because JS is async
         * there is no way to access other plugins metadata/etc here
         * flower and the logger are loaded. Other plugins may still be loading
         * @param {*} flower the flower API container
         * @param {*} logger your own logger
         */
        PluginRegistered: function (flower, logger) {
            this.flower = flower;
            this.logger = logger;
            this.logger.write("Loaded");

            flower.RegisterPatch(this.flower.GetGameMain(), "startNewGame", function (a, b, c) {
                logger.write("Test");
            }, false);
        },


        /**
         * Flower will call this as a post-load event when it has finished loading
         * or disposing of all plugins. Not implemented yet.
         */
        PluginAwake: function () {
            this.logger.write("Awake");
        },

    }