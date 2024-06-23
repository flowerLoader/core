## Installing From a Released version

1. Select and download a release from the [Releases Page](https://github.com/flowerLoader/core/releases) that uses the coaw slug ex: flower-core-coaw.zip

2. Determine your install directory. The game directory varies slightly between the Linux and Windows release. Choose your operating system below to determine your base install directory.

<details>
<summary>Windows Install Directory</summary>

To find Your base install directory right click on steam and select Manage>Browse Local Files then navigate to:

`/game`

You should see the files `index.html` and `empty.html`. This folder is your base install directory. All instructions will be given with this folder as the root in mind.
</details>

<details>
<summary>Linux Install Directory</summary>

To find Your base install directory right click on steam and select Manage>Browse Local Files then navigate to:

`/gamedata/game`

You should see the files `index.html` and `empty.html`. This folder is your base install directory. All instructions will be given with this folder as the root in mind.
</details>

3. Copy the contents of your release zip directly into the base install directory. You should now have a `flower` folder alongside the files `index.html` and `empty.html` from before like so:
   
```plaintext
+- logger.html
+- logger.css
+- index.html
++ flower
 +- flowerful.js
 +- config.js
 ++ flower-plugins
  +- feed_me_plugins

<There will be more folders and files>
```

4. Open the file index.html in your base install directory and locate the following line:
```html
<script src="./js/game/union.js"></script>
```
Add a reference to flowerful.js directly below that line so it looks like the following:
```html
<script src="./js/game/union.js"></script>
<script type="module" src="./flower/flowerful.js"></script>
```

Congrats, Flower is now installed!

Flower keeps its plugins in the folder `/flower/flower-plugins/` under your base install directory. You can copy in any plugins you wish to use into this directory and then add them to the `config.js` file to use them. You can also do the opposite if you wish to disable a plugin without deleting it from your plugins folder.

## Known Issues and Workarounds

### Windows Specific Launch Options

The windows version has additional arguments you will need to use to allow Flower to load and/or enable the dev tools (for debugging). Create a file called `launch.bat` in your game directory (right click -> browse local files) and paste in the following:

```bat
@echo off
set WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS="--allow-file-access-from-files"
Game.exe
```

Then, back in your steam library set the game's command line arguments to `launch.bat %command%`

This is currently a work-around for windows not properly setting environment variables when steam launches a game and we plan to find a better solution for the future.

### How to Launch the Game Without Steam

If you wish to launch the game without steam you simply need to create a file in the game directory (right click -> browse local files) called `steam_appid.txt` and paste the game's steam id inside.

`2761610`

There should be no other spaces or lines in this file, just the ID. Now you can launch the game by double-clicking the exe without steam or by using the shell to pass env variables as needed.