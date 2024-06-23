# Flower Loader

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin loader and detour manager for Node.js applications. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Get Involved

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

## Table of Contents

  - [Supported Games](#supported-games)
  - [Installing Flowerloader From a
    Release](#installing-flowerloader-from-a-release)
  - [Automatic Install With
    FlowerCLI](#automatic-install-with-flowercli)
  - [Development](#development)
      - [Prerequisites](#prerequisites)
      - [Clone the Repository](#clone-the-repository)
      - [Install required packages](#install-required-packages)
      - [Build the project](#build-the-project)
  - [Contributing](#contributing)
  - [FAQ & Troubleshooting](#faq--troubleshooting)

## Supported Games

[![Steam](https://img.shields.io/badge/Steam-Creator_Of_Another_World-1b2838?style=for-the-badge&logo=steam)](https://store.steampowered.com/app/2761610/Creator_of_Another_World/)  
by [kuetaro (くえたろう)](https://store.steampowered.com/curator/44822906)

[![Steam](https://img.shields.io/badge/Steam-Golden_Crone_Hotel-1b2838?style=for-the-badge&logo=steam)](https://store.steampowered.com/app/497800/Golden_Krone_Hotel/)  
by [Vulgat](https://store.steampowered.com/curator/33977309)

## Installing Flowerloader From a Release

For installation instructions, see the readme file for the specific
supported title.

<details>
<summary>Supported Titles</summary>

  - [Creator of Another World](gameSupport/coaw/static/readme.md)
  - [Golden Crone Hotel](gameSupport/goldhotel/static/readme.md)
  - [Generic](gameSupport/none/static/readme.md)

</details>

## Automatic Install With FlowerCLI

Visit [FlowerCLI's page](https://github.com/flowerLoader/tool) for more
information on automatic installation

## Development

### Prerequisites

  - [Git](https://git-scm.com/downloads)
  - [NPM](https://nodejs.org/en/download/package-manager)
  - ESBuild (installed through NPM for you)

Note: This guide will assume the user is using VSCode as their IDE.

### Clone the Repository

``` bash
git clone https://github.com/flowerLoader/core.git
cd core
```

### Install required packages

``` bash
npm install
```

### Build the project

You can simply run the build task from VSCode if you're using it or run
the esbuild command from your terminal if you're not

``` bash
#Example command to build for Creator of Another World:
npx esbuild --bundle gameSupport/coaw/index.ts --format=esm --outdir=build/ --platform=node
```

Your build command will vary based on which game you are building from.
See the included tasks under `.vscode/tasks.json` for more details.

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
