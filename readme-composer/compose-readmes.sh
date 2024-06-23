#!/bin/bash

#Main Readme
pandoc --from gfm -t gfm -o ../readme.md -H ./snippets/header.md --toc ./snippets/main-body.md ./snippets/footer.md

#Build game support readmes
for item in gameSupport/*; do
    GAMENAME=${item##gameSupport/}
    GAMENAME=${GAMENAME%.md}

    printf "Building ${GAMENAME} readme \n"
    pandoc --from gfm -t gfm -o ../gameSupport/${GAMENAME}/static/readme.md -H ./snippets/header.md --toc ./gameSupport/${GAMENAME}.md ./snippets/footer.md
done
