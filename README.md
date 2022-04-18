Hypnos </br>
Ce projet a éte realisé dans le cadre de mon ECF (Evaluation en Cours de Formation) chez Studi

## Technologies

**Front:** HTML5,avec moteur de template twig CSS3, Bootstrap 5, JavaScript, avec les librairies jquery et axios <br />
**Back:** MySQL, PHP8, Symfony <br />
**Déploiement** Heroku avec add-on ClearDB MySQL <br />
**Bundles Symfony** Tous les bundles installés de base avec une installation complète et aussi:<br />
Faker,Doctrine,Mailer,sendgrid, annotations, profiler 
## Local

Pour cloner le projet :

```bash
  git clone https://github.com/Rjcfer/Ecf.git
```

Vérifier les dépendances :

```bash
  symfony check:requirements
```
Changer le fichier .env.test en .env </br>
Ne pas oublier de configurer le #Database_url </br>

## Déploiement en local
Lancer xampp ,apache et MySQL </br>
Créer la base de données et les tables avec doctrine:
```bash
php bin/console doctrine:migrations:migrate
```

Lancer les fixtures:
```bash
symfony console doctrine:fixtures:load
```
Avec les fixtures, de la fausse data sera générée et avec celle-ci, un utilisateur avec un rôle de "superadmin" sera crée </br>
email de connexion superadmin@superadmin </br>
mot de passe superadmin </br>

Lancer le serveur local :
```bash
  symfony server:start
```
Pour les mails il vous serait nécessaire de créer un compte sur sendgrid et de 
paramétrer votre fichier .env ansi que d'effectuer le changement d'email dans le contactController.

## Déploiement en ligne
Pour deployer sur heroku il vous faut un compte, et heroku CLI</br>
Dans le ternimal sur votre projet:
```bash
heroku login
heroku create
```
Ensuite, vous devez suivre le tutoriel de ClearDB MySQL pour installer votre base de données en ligne </br>
le lien officiel: </br>
https://devcenter.heroku.com/articles/cleardb

Puis:
```bash
git add .
git commit -m ' mon message de commit'
git push heroku master 
```