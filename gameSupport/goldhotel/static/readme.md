# Flower Loader

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin loader and detour manager for Node.js applications. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Get Involved

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

## Table of Contents

  - [Notice to Modders](#notice-to-modders)
  - [Installing From a Released
    version](#installing-from-a-released-version)
  - [Contributing](#contributing)
  - [FAQ & Troubleshooting](#faq--troubleshooting)

## Notice to Modders

**Notice**: This version of Flower is in *experimental* support. There
may be breaking changes between releases and some features may not work
as expected or at all. There is currently no types package for this game
so plugin development will be more difficult.

## Installing From a Released version

1.  Select and download a release from the [Releases
    Page](https://github.com/flowerLoader/core/releases) that uses the
    goldhotel slug ex: flower-core-goldhotel.zip

2.  Open your game directory (right click in steam -\> browse game
    files) and then open the folder `package.nw` this folder contains
    many files but you should see `index.html` `node_modules` and
    `saves` if you're in the correct folder. Extract the contents of the
    flower zip (including the flower folder) into this folder. You
    should now see the `flower` folder alongside the previously
    mentioned items in this folder.

3.  Open the file `index.html` in a text editor of your choosing. Find
    the line that looks like this:
    
    ``` html
    <script src="markov/main.js"></script>
    ```
    
    and edit it to look like the following:
    
    ``` html
    <script src="markov/main.js"></script>
    <script type="module" src="./flower/flowerful.js"></script>
    ```

Congrats, Flower is now installed\!

Flower keeps its plugins in the folder `/flower/flower-plugins/`. You
can copy in any plugins you wish to use into this directory and then add
them to the `config.js` file to use them. You can also do the opposite
if you wish to disable a plugin without deleting it from your plugins
folder.

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
