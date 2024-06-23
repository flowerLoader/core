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

Your build command will vary based on which game you are building from. See the included tasks under `.vscode/tasks.json` for more details.