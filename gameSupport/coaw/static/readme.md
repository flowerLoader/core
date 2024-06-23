# Flower Loader

![Static Badge](https://img.shields.io/badge/Language-Typescript_ESM-blue?style=for-the-badge&logo=typescript)

![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-yellowgreen?style=for-the-badge&logo=creativecommons)

**Flower Loader** is a Plugin loader and detour manager for Node.js applications. With Flower Loader, you can easily manage and develop Plugins. This repository contains the core plugin loader. It is built with ESBuild and is source-available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Get Involved

[![Join the Discord](https://img.shields.io/discord/1239786034561028136?color=5865F2&label=Join+The+Discord&logo=discord&style=for-the-badge)](https://discord.gg/kHSEXyawFY)

## Table of Contents

  - [Installing From a Released
    version](#installing-from-a-released-version)
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
