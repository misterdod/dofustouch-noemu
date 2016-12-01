# DofusTouch No-Emu
##### **/!\ Attention** à la demande de Ankama le fichier script.js n'est plus fourni dans notre repertoire Git. Vous devez donc l'obtenir par votre propre moyen et le placer dans le repertoire src/browser.
Jouer à DofusTouch sans emulateur grâce à un portage entiérement en javascript via [electron](electron github), disponible en open source et cross-platform (OS X, Win, Linux)
#### DofusTouch No-Emu est un [Projet Open Source](http://openopensource.org/)


## À propos
DofusTouch No-Emu fonctionne sur :
 - Windows (32/64 bit)
 - OS X
 - Linux (x86/x86_64)

## Installation :
```sh
$ git clone https://github.com/scapain/dofustouch-noemu.git
$ cd dofustouch-noemu
$ npm install
```
/!\ Vous devez ensuite recupérer le fichier script.js (code source dofustouch) et le placer dans src/browser/

## Lancement :
```sh
$ npm start
```

## Build Distribution :
```sh
$ npm run build
```

Vous pouvez choisir votre distribution dans le fichier build.js à la ligne
```js
platform: ["linux","darwin","win"],
arch: "all", //x64 ou ia32
```
Attention vous devez utiliser wine pour build une version windows sur Linux ou OS X.
Vous pouvez sinon utiliser notre image docker qui est configuré pour build sur toutes les plateformes (cf section Docker)

### Docker :
```sh
$ docker-compose up
```

## Create Update :
Seulement les dossiers src et view ainsi que le package.json peuvent êtres mis à jours via l'updater
```sh
$ tar czvf update.tar.gz ./node_modules ./src ./package.json ./CHANGELOG.md
```

## Todos

 - Auto-Save possibilité de sauvegarder une combinaison d'onglet
 - Raccourci pour aller sur l'onglet actif (onglet sur le quel c'est au tour du joueur)

License
----

GNU GPLv3 read [LICENCE](https://github.com/scapain/dofustouch-noemu/blob/master/LICENCE)
