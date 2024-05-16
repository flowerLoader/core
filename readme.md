<h1>Flower Loader CLI</h1>

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin Manager for `Creator of Another World`. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

<h2>Get Involved</h2>

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

<h2>Supported Games</h2>

[![Steam](https://img.shields.io/badge/Steam-Creator_Of_Another_World-1b2838?style=for-the-badge&logo=steam)](https://store.steampowered.com/app/2761610/Creator_of_Another_World/)  
by [kuetaro (くえたろう)](https://store.steampowered.com/curator/44822906)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installing FlowerLoader](#installing-flowerloader)
  - [From a Released version](#from-a-released-version)
  - [From Source](#from-source)
  - [From FlowerCLI](#from-flowercli)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install required packages](#install-required-packages)
  - [Build the project](#build-the-project)
- [Contributing](#contributing)
- [FAQ \& Troubleshooting](#faq--troubleshooting)

## Installing FlowerLoader

### From a Released version

1. Select and download a release from the [Releases Page](https://github.com/flowerLoader/core/releases)

2. Determine your install directory. The game directory varies slightly between the Linux and Windows release. Choose your operating system below to determine your base install directory.

<details>
<summary>Windows Install Directory</summary>

To find Your base install directory right click on steam and select Manage>Browse Local Files then navigate to:

`TODO: Ask Damon what this is`

You should see the files `index.html` and `empty.html`. This folder is your base install directory. All instructions will be given with this folder as the root in mind.
</details>

<details>
<summary>Linux Install Directory</summary>

To find Your base install directory right click on steam and select Manage>Browse Local Files then navigate to:

`/gamedata/game`

You should see the files `index.html` and `empty.html`. This folder is your base install directory. All instructions will be given with this folder as the root in mind.
</details>

3. Copy the contents of your release zip directly into the base install directory. You should now have `logger.html` and `logger.css` alongside the files `index.html` and `empty.html` from before like so:
   
```plaintext
- base_install_directory
+- logger.html
+- logger.css
+- index.html
+- empty.html
<There will be more folders and files>
```

4. Open the file index.html in your base install directory and locate the following line:
```html
<script src="./js/game/union.js"></script>
```
Add a reference to flower.js directly below that line so it looks like the following:
```html
<script src="./js/game/union.js"></script>
<script type="module" src="./js/game/flowerful.js"></script>
```

Congrats, Flower is now installed!

Flower keeps its plugins in the folder `js/game/flower-plugins/` under your base install directory. You can copy in any plugins you wish to use into this directory and flower will find them automatically. If flower reports that a plugin you want to use is disabled, you can edit the JS file and set `enabled=true` on the plugin's meta information. You can also do the opposite if you wish to disable a plugin without deleting it from your plugins folder.

### From Source

1. See [Building from source](#development)
2. See [Installing Flowerloader](#from-a-released-version) using your built files in place of the release zip

### From FlowerCLI

Visit [FlowerCLI's page](https://github.com/flowerLoader/tool) for more information on automatic installation

## Development

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [NPM](https://nodejs.org/en/download/package-manager)
- ESBuild (installed through NPM for you)

Note: This guide will assume the user is using VSCode as their IDE.

### Clone the Repository

```bash
git clone https://github.com/flowerLoader/core.git
cd core
```

### Install required packages

```bash
npm install
```

### Build the project

You can simply run the build task from VSCode if you're using it or run the esbuild command from your terminal if you're not

```bash
npx esbuild --bundle flowerful.ts --format=esm --outdir=build/ --platform=node
```

You will then need to copy the resulting `flowerful.js` file into your base install directory under `/js/game/` alongside `union.js`. In the same location you will need a `flower-plugins` folder for your plugins. Finally, you will need to copy `logger.html` and `logger.css` into your base install directory and configure you `index.html`.

For more information on your base install directory and how to configure `index.html` see [Manual install instructions](#from-a-released-version)

## Contributing

We welcome contributions! More information will be added soon!

## FAQ & Troubleshooting
  
- **How do I report an issue?**
  - Please visit our [GitHub Issues page](https://github.com/flowerLoader/core/issues).

- **How do I uninstall flowerloader**
  - The simplest and fastest way is to run `verify game files` for the game on steam.
  - Alternatively, you may remove the line you added to `index.html` and flower will no longer be loaded.
  - Finally, either way, you may remove all the files you copied in to your base game directory or leave them, they won't be loaded or effect the game in any way anymore

- More troubleshooting tips and frequently asked questions will be added soon.
