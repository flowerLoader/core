# Flower Loader

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin loader and detour manager for Node.js applications. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Get Involved

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

## Table of Contents

  - [Installing From a Released
    version](#installing-from-a-released-version)
  - [Known Issues and Workarounds](#known-issues-and-workarounds)
      - [Windows Specific Launch
        Options](#windows-specific-launch-options)
      - [How to Launch the Game Without
        Steam](#how-to-launch-the-game-without-steam)
  - [Contributing](#contributing)
  - [FAQ & Troubleshooting](#faq--troubleshooting)

## Installing From a Released version

1.  Select and download a release from the [Releases
    Page](https://github.com/flowerLoader/core/releases) that uses the
    coaw slug ex: flower-core-coaw.zip

2.  Determine your install directory. The game directory varies slightly
    between the Linux and Windows release. Choose your operating system
    below to determine your base install directory.

<details>
<summary>Windows Install Directory</summary>

To find Your base install directory right click on steam and select
Manage\>Browse Local Files then navigate to:

`/game`

You should see the files `index.html` and `empty.html`. This folder is
your base install directory. All instructions will be given with this
folder as the root in mind.

</details>

<details>
<summary>Linux Install Directory</summary>

To find Your base install directory right click on steam and select
Manage\>Browse Local Files then navigate to:

`/gamedata/game`

You should see the files `index.html` and `empty.html`. This folder is
your base install directory. All instructions will be given with this
folder as the root in mind.

</details>

3.  Copy the contents of your release zip directly into the base install
    directory. You should now have a `flower` folder alongside the files
    `index.html` and `empty.html` from before like so:

<!-- end list -->

``` plaintext
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

4.  Open the file index.html in your base install directory and locate
    the following line:

<!-- end list -->

``` html
<script src="./js/game/union.js"></script>
```

Add a reference to flowerful.js directly below that line so it looks
like the following:

``` html
<script src="./js/game/union.js"></script>
<script type="module" src="./flower/flowerful.js"></script>
```

Congrats, Flower is now installed\!

Flower keeps its plugins in the folder `/flower/flower-plugins/` under
your base install directory. You can copy in any plugins you wish to use
into this directory and then add them to the `config.js` file to use
them. You can also do the opposite if you wish to disable a plugin
without deleting it from your plugins folder.

## Known Issues and Workarounds

### Windows Specific Launch Options

The windows version has additional arguments you will need to use to
allow Flower to load and/or enable the dev tools (for debugging). Create
a file called `launch.bat` in your game directory (right click -\>
browse local files) and paste in the following:

``` bat
@echo off
set WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS="--allow-file-access-from-files"
Game.exe
```

Then, back in your steam library set the game's command line arguments
to `launch.bat %command%`

This is currently a work-around for windows not properly setting
environment variables when steam launches a game and we plan to find a
better solution for the future.

### How to Launch the Game Without Steam

If you wish to launch the game without steam you simply need to create a
file in the game directory (right click -\> browse local files) called
`steam_appid.txt` and paste the game's steam id inside.

`2761610`

There should be no other spaces or lines in this file, just the ID. Now
you can launch the game by double-clicking the exe without steam or by
using the shell to pass env variables as needed.

## Contributing

We welcome contributions\! Issue and pull requests are welcome,
especially for game support files.

## FAQ & Troubleshooting

  - **How do I report an issue?**
    
      - Please visit our [GitHub Issues
        page](https://github.com/flowerLoader/core/issues).

  - **How do I uninstall flowerloader**
    
      - The simplest and fastest way is to run `verify game files` for
        the game on steam.
      - Alternatively, you may remove the line you added to `index.html`
        and flower will no longer be loaded.
      - Finally, either way, you may remove all the files you copied in
        to your base game directory or leave them, they won't be loaded
        or effect the game in any way anymore

  - **How do I configure what plugins Flower loads?**
    
      - Simply edit the `config.js` file under your base install
        directory in the `flower` folder. There are comments inside this
        file that explain how to set flower to load plugins.

  - More troubleshooting tips and frequently asked questions will be
    added soon.
