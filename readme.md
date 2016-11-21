# DofusTouch No-Emu

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

## Lancement :
```sh
$ npm start
```

## Build Distribution :
```sh
$ npm run dist
```

### Docker :
```sh
$ docker-compose up
```

## Create Update :
Seulement les dossiers src et view ainsi que le package.json peuvent êtres mis à jours via l'updater
```sh
$ tar czvf update.tar.gz ./node_modules ./src ./package.json ./conf.json
```

## Todos

 - Auto-Save possibilité de sauvegarder une combinaison d'onglet
 - Raccourci pour aller sur l'onglet actif (onglet sur le quel c'est au tour du joueur)
 - Déplacement circulaire entre les onglets

License
----

GNU GPLv3 read [LICENCE](https://github.com/scapain/dofustouch-noemu/blob/master/LICENCE)
