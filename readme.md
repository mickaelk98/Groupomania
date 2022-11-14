# Groupomania

Groupomania est un réseau social interne pour les employés de l'entreprise Groupomania, une entreprise fictive. Ce résau social doit faciliter les interactions entre les employés, ils doivent être capables de créer un post le modifier le supprimer et aussi voir tous les posts,
mais aussi liké et commenter tous les posts, un utilisateur administrateur aura les droits de supprimer et de modifier n'importe quel post.

# Prérequis

Pour faire fonctionner ce projet, vous aurez besoin de **node.js** et un lien pour se connecter a une **base de données mongoDB**, pour la base de données vous pouvez en creer une
sur **mongoDB atlas** ou en local avec **mongoDB compas**.

# Installation du projet

1. Cloner le code actuel
   `git clone https://github.com/mickaelk98/Groupomania.git`
2. Diriger vous dans le dossier backend et crée un fichier .env a la racine
3. Entrez les informations suivantes

- MONGODB_DATABASE_LINK = Le lien de votre base de données mongoDB
- JWT_SECRET_KEY = Une chaîne de caractère pour crypter les mots de passe
- ADMIN_USERNAME = L'identifiant de l'administrateur
- ADMIN_PASSWORD = Le mot de passe de l'administrateur

4. Installer les dépendances du projet
   `npm install`
5. lancer le serveur backend
   `nodemon server.js`
6. Aller dans le dossier frontend
7. Installer les dépendances du projet
   `npm install`
8. Lancer le serveur
   `npm run dev`
