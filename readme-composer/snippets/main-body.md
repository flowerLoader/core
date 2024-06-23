## Supported Games

[![Steam](https://img.shields.io/badge/Steam-Creator_Of_Another_World-1b2838?style=for-the-badge&logo=steam)](https://store.steampowered.com/app/2761610/Creator_of_Another_World/)  
by [kuetaro (くえたろう)](https://store.steampowered.com/curator/44822906)

## Installing Flowerloader From a Release

For installation instructions, see the readme file for the specific supported title.

<details>
<summary>Supported Titles</summary>

- [Creator of Another World](gameSupport/coaw/static/readme.md)
- [Generic](gameSupport/none/static/readme.md)

</details>

## Automatic Install With FlowerCLI

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
#Example command to build for Creator of Another World:
npx esbuild --bundle gameSupport/coaw/index.ts --format=esm --outdir=build/ --platform=node
```

After compilation is complete, navigate to the base install directory and then `/flower` under that, creating it if it does not already exist. You will want to copy the following files to this location: `flowerful.js` `logger.html` and `logger.css` and finally create a folder called `flower-plugins` if it does not exist. You will also need a `config.js` file that lists the plugins flower will load. If you don't already have one from a previous install you can copy a blank one from the `/build` folder in the project.

For more information on your base install directory and how to configure `index.html` see [Manual install instructions](#from-a-released-version)
