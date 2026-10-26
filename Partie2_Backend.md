# Partie 2 — Le Back-end : description complète pour intégration HTML

> **Objectif de ce document** : décrire *exactement* le contenu et la mise en forme du fichier `Partie2_Backend.pptx` (7 slides, format 16:9) afin qu'un agent puisse le recréer fidèlement dans la présentation HTML existante.
> Le texte est à reprendre **mot pour mot** (français, avec les apostrophes typographiques ’ et les guillemets « »).

---

## 0. Vue d'ensemble

- **Sujet** : explication du Back-end à un public non technique, avec le fil conducteur de **l'analogie du restaurant** (le Back-end = « la cuisine et la réserve »).
- **Nombre de slides** : 7
- **Format** : 16:9 (10" × 5,625")
- **Progression** : Titre → Définition → Rôle (8 étapes) → Base de données → Sécurité → Exemple concret (connexion) → Résumé
- **Pied de page (slides 2 à 7)** : en bas à gauche « Partie 2 — Le Back-end » (petit, gris-bleu), en bas à droite le numéro de la slide (2, 3, 4, 5, 6, 7). La slide 1 n'a ni pied de page ni numéro.

### Design system (à réutiliser tel quel ou à adapter à la charte HTML)

| Rôle | Couleur | Hex |
|---|---|---|
| Texte principal / fond sombre | Bleu nuit | `#1B1F2A` |
| Fond des slides de contenu | Blanc | `#FFFFFF` |
| Fond des cartes claires | Gris très clair | `#F1F3F6` |
| Texte secondaire | Gris-bleu foncé | `#4A5568` |
| Accent 1 (orange-rouge, couleur « Back-end » / principale) | Orange corail | `#E4572E` |
| Accent 2 (jaune-orangé, couleur « base de données » / surbrillance sur fond sombre) | Ambre | `#F2A541` |
| Accent 3 (vert, couleur « validation » / « sécurité ») | Vert sarcelle | `#2A9D8F` |
| Accent 4 (bleu, couleur « Front-end » / « authentification ») | Bleu acier | `#3D5A80` |
| Accent 5 (gris, couleur « Utilisateur » / pied de page) | Gris-bleu | `#7A8599` |
| Accent 6 (violet-prune, icône « La sécurité » slide 2) | Prune | `#8E5572` |

- **Titres** : police à empattement (**Cambria**), gras, couleur `#1B1F2A`, alignés à gauche en haut de slide.
- **Texte courant** : police sans empattement (**Calibri**, rendu type Lato/Carlito).
- **Style général** : cartes arrondies (coins ~8-12 px) gris clair `#F1F3F6` sans bordure ; blocs « analogie » en **cartes sombres** `#1B1F2A` arrondies avec texte blanc et accents ambre `#F2A541` ; icônes dans des **pastilles rondes colorées** avec pictogramme blanc.
- **Convention de couleurs par acteur** (utilisée surtout slide 6) : Utilisateur = gris-bleu, Front-end = bleu, Back-end = orange, Base de données = ambre.
- **Icônes** : 23 petites images PNG (pictogrammes blancs sur pastille ronde colorée), fournies dans le .pptx (`ppt/media/image-X-Y.png`, X = n° de slide). Dans le HTML, les remplacer par des icônes équivalentes (Font Awesome, Lucide, emoji...) ou extraire les PNG du .pptx.

---

## Slide 1 — Titre de la partie

**Mise en page** : fond **entièrement sombre** `#1B1F2A`. Texte aligné à gauche, placé dans la moitié basse. En bas à droite, une grosse pastille ronde orange `#E4572E` contenant une icône blanche **couvert (fourchette + couteau)**.

**Contenu**
- **Titre** (grand, Cambria gras, blanc) : `Partie 2 — Le Back-end`
- **Sous-titre** (couleur ambre `#F2A541`, Calibri) : `La cuisine et la réserve`
- **Icône** : pastille orange avec fourchette/couteau (« Icône cuisine »)

**Notes du présentateur** : « Introduction : le Back-end est la partie cachée de l'application. On filera l'analogie du restaurant tout au long de cette partie. »

---

## Slide 2 — Qu'est-ce que le Back-end ?

**Mise en page** : fond blanc. Titre en haut. Sous le titre, une phrase de définition en gras. Puis deux zones côte à côte :
- **À gauche (≈ 2/3 de la largeur)** : grille de **6 cartes** grises (2 colonnes × 3 lignes), chacune avec une pastille ronde colorée + une icône à gauche et un libellé en gras à droite.
- **À droite (≈ 1/3)** : **grande carte sombre** `#1B1F2A` « Analogie du restaurant ».

**Contenu**
- **Titre** : `Qu’est-ce que le Back-end ?`
- **Définition (gras)** : `Toute la partie d’une application que l’utilisateur ne voit pas, mais qui permet à l’application de fonctionner.`

**Les 6 cartes (ordre de lecture : ligne par ligne, gauche → droite)**

| Position | Libellé | Couleur de la pastille | Icône |
|---|---|---|---|
| Ligne 1, gauche | Les serveurs | Bleu `#3D5A80` | Serveur / racks empilés |
| Ligne 1, droite | La logique métier | Orange `#E4572E` | Engrenages |
| Ligne 2, gauche | Les API | Vert `#2A9D8F` | Prise / connecteur |
| Ligne 2, droite | Les bases de données | Ambre `#F2A541` | Cylindre de base de données |
| Ligne 3, gauche | La sécurité | Prune `#8E5572` | Bouclier |
| Ligne 3, droite | L’authentification et les autorisations | Bleu `#3D5A80` | Clé |

**Carte sombre « Analogie du restaurant »**
- En-tête : pastille orange avec icône couvert + titre `Analogie du restaurant` (Cambria gras, blanc)
- Texte blanc : `Le client ne voit pas la cuisine. Pourtant, c’est là que sa commande est préparée.`
- Texte **gras en ambre** `#F2A541` : `Dans une application, l’utilisateur voit le Front-end, tandis que le Back-end travaille en arrière-plan.`

**Notes du présentateur** : « Définition + liste des composants. Insister : tout ce que l'utilisateur ne voit pas mais qui fait fonctionner l'application. »

---

## Slide 3 — Le rôle du Back-end : réfléchir et décider

**Mise en page** : fond blanc. Titre, puis une ligne d'accroche, un sous-titre gris, une grille de **8 cartes** (4 colonnes × 2 lignes) avec numéro dans un rond orange, et en bas une **bannière sombre** pleine largeur avec l'analogie.

**Contenu**
- **Titre** : `Le rôle du Back-end : réfléchir et décider`
- **Ligne d'accroche** : `Le Front-end envoie une demande : ` suivie de **`« Je veux acheter ce produit. »`** en *italique gras orange* `#E4572E`
- **Sous-titre** (petit, gras, gris-bleu `#7A8599`) : `Le Back-end doit alors :`

**Les 8 étapes** (chaque carte = rond orange `#E4572E` avec numéro blanc + texte) :

| N° | Texte |
|---|---|
| 1 | Recevoir la demande |
| 2 | Vérifier que l’utilisateur est authentifié |
| 3 | Vérifier que le produit existe |
| 4 | Vérifier sa disponibilité |
| 5 | Vérifier le prix |
| 6 | Enregistrer la commande |
| 7 | Mettre à jour le stock |
| 8 | Renvoyer une réponse au Front-end |

(Ligne 1 = étapes 1 à 4, ligne 2 = étapes 5 à 8.)

**Bannière sombre** (`#1B1F2A`, pastille orange avec icône couvert à gauche) :
- **`Au restaurant : « Je voudrais une pizza. »`** en gras ambre `#F2A541`, suivi en blanc de : `La cuisine vérifie : commande correcte ? ingrédients disponibles ? préparation ? commande enregistrée ? Le client ne voit pratiquement rien de ce processus.`

**Notes du présentateur** : « Dérouler les 8 étapes puis montrer que tout se passe en coulisses, comme dans la cuisine d'un restaurant. »

---

## Slide 4 — La base de données : la réserve

**Mise en page** : fond blanc. Titre, puis phrase d'intro en gras. À gauche (≈ 2/3) : grille de **8 pastilles/cartes** grises (2 colonnes × 4 lignes), chacune avec un **point rond ambre** `#F2A541` à gauche du texte. À droite (≈ 1/3) : **grande carte sombre** avec icône base de données.

**Contenu**
- **Titre** : `La base de données : la réserve`
- **Intro (gras)** : `L’endroit où l’application conserve ses informations. Exemple : un site e-commerce.`

**Les 8 éléments stockés** (ordre ligne par ligne, gauche → droite) :
1. Comptes utilisateurs — 2. Mots de passe (sous forme sécurisée)
3. Produits — 4. Prix
5. Stocks — 6. Commandes
7. Paiements — 8. Historique

**Carte sombre à droite**
- En haut : pastille ronde **ambre** `#F2A541` avec icône blanche **cylindre de base de données**
- Sous-titre (Cambria gras, ambre) : `Dans notre restaurant`
- Paragraphe 1 (blanc) : `La base de données est la réserve et les registres du restaurant.`
- Paragraphe 2 (blanc) : `Elle contient les informations nécessaires, mais n’est pas directement accessible aux clients.`

**Notes du présentateur** : « La base de données stocke tout ce que l'application doit mémoriser. Le client ne la voit jamais directement. »

---

## Slide 5 — La sécurité : le videur de la cuisine

**Mise en page** : fond blanc. Titre, phrase d'intro en gras, puis **3 grandes cartes grises** côte à côte (rangée du haut), puis **2 cartes** côte à côte en dessous (rangée du bas : une grise, une sombre).

**Contenu**
- **Titre** : `La sécurité : le videur de la cuisine`
- **Intro (gras)** : `Un utilisateur essaie d’accéder à son compte. Le Back-end vérifie :`

**Rangée du haut — 3 contrôles** (chaque carte : pastille ronde + icône en haut, question en *italique*, puis flèche + mot-clé en gras de grande taille, tous deux de la couleur de la pastille)

| Pastille / couleur | Icône | Question (italique) | Mot-clé (gras, précédé de →) |
|---|---|---|---|
| Bleu `#3D5A80` | Empreinte digitale | `Qui es-tu ?` | `→ Authentification` |
| Orange `#E4572E` | Personne avec bouclier | `As-tu le droit d’accéder à cette information ?` | `→ Autorisation` |
| Vert `#2A9D8F` | Presse-papier avec coche | `Ta demande est-elle valide ?` | `→ Validation` |

**Rangée du bas**
- **Carte grise (gauche)** : label `Objectif` en gras orange `#E4572E`, puis texte : `Empêcher un utilisateur de consulter ou modifier des informations auxquelles il ne devrait pas avoir accès.`
- **Carte sombre (droite)** : label `Analogie` en gras ambre `#F2A541`, puis texte blanc : `Même si quelqu’un entre dans le restaurant, il ne peut pas entrer dans la cuisine et prendre ce qu’il veut.`

**Notes du présentateur** : « Trois contrôles distincts : authentification, autorisation, validation. »

---

## Slide 6 — Exemple concret : connexion à un compte

**Mise en page** : fond blanc. Titre, puis un **schéma de flux en 6 étapes** disposé en **2 rangées de 3 cartes** grises, reliées par des **chevrons « › » gris-bleu** entre les cartes d'une même rangée (le flux se lit gauche → droite, puis passe à la rangée suivante). En bas, une **bannière sombre** pleine largeur avec une phrase de conclusion centrée.

**Contenu**
- **Titre** : `Exemple concret : connexion à un compte`

**Les 6 cartes** (chaque carte : pastille ronde avec icône + titre numéroté en gras coloré à droite de la pastille, description en dessous en texte noir normal)

| Étape | Titre (couleur) | Icône (pastille) | Description |
|---|---|---|---|
| 1 | `1. Utilisateur` (gris-bleu `#7A8599`) | Silhouette de personne (gris-bleu) | `Entre son email et son mot de passe` |
| 2 | `2. Front-end` (bleu `#3D5A80`) | Écran / moniteur (bleu) | `Envoie les informations au Back-end` |
| 3 | `3. Back-end` (orange `#E4572E`) | Engrenages (orange) | `Vérifie les informations dans la base de données` |
| 4 | `4. Base de données` (noir `#1B1F2A`) | Cylindre BDD (ambre `#F2A541`) | `Confirme si le compte existe et si les informations sont correctes` |
| 5 | `5. Back-end` (orange `#E4572E`) | Engrenages (orange) | `Autorise ou refuse la connexion` |
| 6 | `6. Front-end` (bleu `#3D5A80`) | Écran / moniteur (bleu) | `Affiche « Bienvenue » ou « Identifiants incorrects »` |

- Rangée 1 = étapes 1 → 2 → 3 ; rangée 2 = étapes 4 → 5 → 6. Chevrons « › » entre 1-2, 2-3, 4-5 et 5-6.

**Bannière sombre** (`#1B1F2A`, texte blanc gras centré) : `Le bouton « Se connecter » n’effectue pas tout le travail lui-même.`

**Notes du présentateur** : « Démonstration simple : suivre le trajet de l'email et du mot de passe, de l'utilisateur jusqu'à la réponse affichée. »

---

## Slide 7 — Résumé : le Back-end en 4 fonctions

**Mise en page** : fond blanc. Titre, puis **4 cartes grises** côte à côte (1 rangée × 4 colonnes), chacune avec pastille + icône en haut, nom de la fonction en Cambria gras, et description courte. En bas, **grande bannière sombre** pleine largeur avec la phrase-conclusion sur deux lignes, centrée, en Cambria gras.

**Contenu**
- **Titre** : `Résumé : le Back-end en 4 fonctions`

**Les 4 cartes**

| Ordre | Titre (Cambria gras) | Pastille / icône | Description |
|---|---|---|---|
| 1 | `Logique` | Orange `#E4572E` — cerveau | `Décider quoi faire avec une demande` |
| 2 | `Données` | Ambre `#F2A541` — cylindre BDD | `Stocker et récupérer les informations` |
| 3 | `Sécurité` | Vert `#2A9D8F` — bouclier | `Protéger les utilisateurs et les données` |
| 4 | `Traitement` | Bleu `#3D5A80` — engrenages | `Exécuter les opérations demandées` |

**Bannière de conclusion** (fond `#1B1F2A`, texte centré, Cambria gras, grande taille) :
- Ligne 1 (blanc) : `Le Front-end montre et demande.`
- Ligne 2 (ambre `#F2A541`) : `Le Back-end traite, vérifie et décide.`

**Notes du présentateur** : « Conclure avec la phrase centrale : le Front-end montre et demande, le Back-end traite, vérifie et décide. »

---

## Instructions pour l'agent d'intégration

1. **Reprendre le texte mot pour mot** (voir blocs ci-dessus) ; ne pas reformuler.
2. **Conserver l'ordre des 7 slides** et la structure de chaque slide (nombre de cartes, ordre de lecture, grille).
3. **Reproduire les accents de couleur par rôle** (orange = Back-end / principal, ambre = base de données / surbrillance sur fond sombre, vert = validation / sécurité, bleu = Front-end / authentification, gris-bleu = utilisateur).
4. **Alternance claire / sombre** : slide 1 entièrement sombre ; slides 2 à 7 sur fond blanc avec des **cartes grises** et **un bloc sombre par slide** (carte analogie, bannière ou conclusion) pour porter le message clé de la slide.
5. **Icônes** : chaque pastille ronde colorée contient un pictogramme blanc. Utiliser la librairie d'icônes déjà présente dans la présentation HTML, ou extraire les PNG de `ppt/media/` du .pptx (nommés `image-<slide>-<n>.png`).
6. **Notes du présentateur** : les intégrer dans le système de notes/speaker notes de la présentation HTML si elle en possède un (sinon les ignorer).
7. **Pied de page** (slides 2 à 7) : `Partie 2 — Le Back-end` à gauche, numéro de slide à droite ; à adapter à la numérotation globale de la présentation HTML.
8. **Adapter à la charte HTML existante** si les couleurs/polices diffèrent : la structure et le contenu priment sur l'apparence exacte.
