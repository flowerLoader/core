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