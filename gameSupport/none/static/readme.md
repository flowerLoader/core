# Flower Loader

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin loader and detour manager for Node.js applications. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Get Involved

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

## Table of Contents

  - [Installing From a Released
    version](#installing-from-a-released-version)
  - [Contributing a Game Support
    File](#contributing-a-game-support-file)
  - [Contributing](#contributing)
  - [FAQ & Troubleshooting](#faq--troubleshooting)

## Installing From a Released version

Select and download a release from the [Releases
Page](https://github.com/flowerLoader/core/releases) that uses the coaw
slug ex: flower-core-none.zip

This version is not designed to support any specific game, you will need
to understand how NWjs games work and how to run scripts from within
them.

Determine where it is appropriate to inject flower and add a line to
reference flowerful.js as a module to the scene's html file.

Flower keeps its plugins in the folder `/flower/flower-plugins/` under
your base install directory. You can copy in any plugins you wish to use
into this directory and then add them to the `config.js` file to use
them. You can also do the opposite if you wish to disable a plugin
without deleting it from your plugins folder.

## Contributing a Game Support File

\--TBA--

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
