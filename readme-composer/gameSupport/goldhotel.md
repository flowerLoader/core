## Notice to Modders

**Notice**: This version of Flower is in _experimental_ support. There may be breaking changes between releases and some features may not work as expected or at all. There is currently no types package for this game so plugin development will be more difficult.

## Installing From a Released version

1. Select and download a release from the [Releases Page](https://github.com/flowerLoader/core/releases) that uses the goldhotel slug ex: flower-core-goldhotel.zip
2. Open your game directory (right click in steam -> browse game files) and then open the folder `package.nw` this folder contains many files but you should see `index.html` `node_modules` and `saves` if you're in the correct folder. Extract the contents of the flower zip (including the flower folder) into this folder. You should now see the `flower` folder alongside the previously mentioned items in this folder.
3. Open the file `index.html` in a text editor of your choosing. Find the line that looks like this:

    ```html
    <script src="markov/main.js"></script>
    ```
    and edit it to look like the following:
    ```html
    <script src="markov/main.js"></script>
    <script type="module" src="./flower/flowerful.js"></script>
    ```

Congrats, Flower is now installed!

Flower keeps its plugins in the folder `/flower/flower-plugins/`. You can copy in any plugins you wish to use into this directory and then add them to the `config.js` file to use them. You can also do the opposite if you wish to disable a plugin without deleting it from your plugins folder.