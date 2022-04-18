Hypnos </br>
Ce project a etait realiser dans le cadre de mon ECF (evaluation en cours de formation ) chez Study

## Technologies

**Front:** HTML5,avec moteur de template twig CSS3, Bootstrap 5, JavaScript, avec les libraries jquery et axios <br />
**Back:** MySQL, PHP8, Symfony <br />
**Déploiement** Heroku avec add-on ClearDB MySQL <br />
**Bundles Symfony** Tous les bundles installés de base avec un instalation complete et aussi <br />
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
Lancer les fixtures:
```bash
symfony console doctrine:fixtures:load
```
Lancer le serveur local :

```bash
  symfony server:start
```