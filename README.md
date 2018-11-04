# Umusic-backend

[Api](https://umusic-backend.herokuapp.com/api)

## Règles et worklfow

Le workflow git utilisé dans le cadre de ce projet est le GitFlow.
Nous préconisons vivement à tous les developpeurs de lire la documentation suivante: https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow

Dans un soucis de cohérence, la branche Master est donc protégées en accord avec le workflow.
Les développeurs developperont sur les branches features/ et demanderont une merge/pull request via l'interface github dès qu'ils souhaitent fusionner leur branche avec devel.
Le code sera review par les autres membres du groupe. Si tout est OK, la branche feature est merge avec devel ce qui incorpore la feature avec la pre-production.

## Les prérequis
### Outil
 - Installer yarn : <https://yarnpkg.com/en/docs/install>
 - Installer Git
 - Installer Docker

### IDE ou Editeur
 1. Installer votre éditeur favori (WebStorm, VSCode, Vim, ...)

## Installation
```
  git clone git@github.com:wawrzy/umusic-backend.git
  yarn
```

## Pour les développeurs
 - Les technologies utilisées sont express, mongodb, docker, mocha
 - Lancer le projet sur le serveur local :
    * `docker-compose up`
    * `yarn migration up`
    * `yarn start:dev` > <http://localhost:3100>


## Comment contribuer
 - Créer une branche feature/nom_feature
 - Dévelloper la feature
 - Lancer les tests `yarn test`
 - Vérifier que le coverage n'a pas baissé `yarn test:cov`
 - Créer une pull request

## Version
 - 1.0

## Licence
- Umusic est un projet open source sous la licence MIT :
  opensource.org/licenses/MIT


## Auteurs
 - Bourgeay William - Epitech
 - Wawrzyniak Julien - Epitech
 - Hostetter Alexy - Epitech

---
