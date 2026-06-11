# Configuration Brevo — Guide pas à pas

Ce guide vous accompagne pour connecter votre landing page à Brevo (gratuit), afin que chaque téléchargement crée un contact et déclenche l'envoi automatique du livre blanc par email.

> **Temps estimé : 15-20 minutes.** Aucune carte bancaire requise.

---

## 1. Créer un compte Brevo gratuit

1. Allez sur **[brevo.com](https://www.brevo.com)**.
2. Cliquez sur **« S'inscrire gratuitement »**.
3. Renseignez votre email et un mot de passe (compte créé en ~2 min).
4. Confirmez votre adresse email via le lien reçu.

Le plan gratuit suffit : **300 emails/jour** et jusqu'à **100 contacts marketing**.

---

## 2. Vérifier l'email expéditeur

L'email de confirmation doit partir d'une adresse vérifiée, sinon il finira en spam.

1. Menu **Réglages** (icône engrenage) → **Expéditeurs, domaines & IP dédiées**.
2. Onglet **Expéditeurs** → **« Ajouter un expéditeur »**.
3. Entrez le nom affiché (ex : `Livre Blanc D2C`) et votre email expéditeur.
4. Ouvrez l'email de validation envoyé par Brevo et cliquez sur le lien de confirmation.
5. *(Recommandé)* Si vous avez un nom de domaine, authentifiez-le (SPF/DKIM) dans l'onglet **Domaines** pour une délivrabilité optimale.

---

## 3. Créer la liste de contacts et récupérer le LIST_ID

1. Menu **Contacts** → **Listes** → **« Ajouter une nouvelle liste »**.
2. Nommez-la **`LP-Livre-Blanc`**.
3. Validez.
4. Ouvrez la liste : le **`LIST_ID`** est le numéro affiché dans l'URL ou dans le tableau des listes (colonne ID).

> 📌 **Notez ce numéro.** C'est la valeur de `BREVO_LIST_ID` dans `index.html`.

---

## 4. Créer le template d'email de confirmation

1. Menu **Campagnes** → **Templates** (Modèles) → **« Créer un template »**.
2. Choisissez l'éditeur **« Drag & Drop »** ou **« Éditeur de code »**.
3. Configurez les champs ci-dessous.

### Objet
```
Voici votre guide, {{contact.FIRSTNAME}} 🎯
```

### Corps de l'email
```
Bonjour {{contact.FIRSTNAME}},

Votre guide est prêt. Cliquez ici pour le télécharger :

→ [Télécharger le Livre Blanc IA & D2C]
(lien : https://[VOTRE_URL_GITHUB_PAGES]/assets/lb.pdf)

Dans ce guide, vous trouverez la méthode complète pour intégrer
l'IA dans votre stratégie D2C — de la création de contenu à la
distribution omnicanale.

Une question pour moi : quelle est votre principale difficulté
aujourd'hui dans votre e-commerce ?

Répondez directement à cet email, je lis tout.

À très bientôt,
L'équipe Livre Blanc D2C
```

> ⚠️ Remplacez `[VOTRE_URL_GITHUB_PAGES]` par votre vraie URL (voir `README.md`).
> Exemple final : `https://monpseudo.github.io/livre-blanc-d2c/assets/lb.pdf`
> Mettez le texte **« Télécharger le Livre Blanc IA & D2C »** en bouton/lien cliquable pointant vers cette URL.

4. **Activez** le template (statut « Actif »), puis enregistrez.

---

## 5. Récupérer le TEMPLATE_ID

1. Retournez dans **Campagnes** → **Templates**.
2. Dans la liste, repérez votre template : son **`ID`** est affiché à côté du nom (ou dans l'URL quand vous l'ouvrez).

> 📌 **Notez ce numéro.** C'est la valeur de `BREVO_TEMPLATE_ID` dans `index.html`.

---

## 6. Récupérer la clé API

1. Menu **Réglages** → **SMTP & API** (`Account → SMTP & API`).
2. Onglet **« Clés API »** → **« Générer une nouvelle clé API »**.
3. Donnez-lui un nom (ex : `landing-page-lb`) et copiez la clé immédiatement (elle ne s'affiche qu'une fois).

> 📌 **C'est la valeur de `BREVO_API_KEY` dans `index.html`.**

---

## 7. Où coller les 3 valeurs dans `index.html`

Ouvrez `index.html` et trouvez le bloc `<script>` (vers la fin du fichier). Les 3 lignes à modifier se trouvent **juste après** le bloc de commentaire `BREVO SETUP REQUIRED` :

| Variable             | Ligne (approx.) | Valeur à remplacer par                     |
|----------------------|-----------------|--------------------------------------------|
| `BREVO_API_KEY`      | ~ ligne 479     | Votre clé API (étape 6) — entre apostrophes |
| `BREVO_LIST_ID`      | ~ ligne 480     | Votre LIST_ID (étape 3) — un nombre        |
| `BREVO_TEMPLATE_ID`  | ~ ligne 481     | Votre TEMPLATE_ID (étape 5) — un nombre    |

Avant :
```javascript
const BREVO_API_KEY = 'REPLACE_WITH_YOUR_BREVO_API_KEY';
const BREVO_LIST_ID = 3;       // REPLACE with your list ID from Brevo
const BREVO_TEMPLATE_ID = 1;   // REPLACE with your email template ID
```

Après (exemple) :
```javascript
const BREVO_API_KEY = 'xkeysib-abc123...votre-cle';
const BREVO_LIST_ID = 7;
const BREVO_TEMPLATE_ID = 2;
```

> 💡 Pour retrouver la ligne exacte : recherchez `REPLACE_WITH_YOUR_BREVO_API_KEY` dans votre éditeur.

---

## 8. Tester le tunnel complet avant la mise en ligne

1. Ouvrez `index.html` dans votre navigateur (en local ou après déploiement GitHub Pages).
2. Remplissez le formulaire avec **votre propre prénom + email**, cochez la case RGPD, cliquez sur **« Télécharger mon guide → »**.
3. Vérifiez que :
   - ✅ Le message de remerciement s'affiche (« Merci [Prénom] ! 🎯 »).
   - ✅ Le contact apparaît dans **Brevo → Contacts → liste `LP-Livre-Blanc`**.
   - ✅ Vous recevez l'email de confirmation avec le bon prénom et un lien de téléchargement **fonctionnel**.
4. Cliquez sur le lien du PDF dans l'email pour confirmer qu'il s'ouvre bien.

> ⚠️ **Sécurité :** la clé API est visible côté navigateur (front-end). Sur le plan gratuit Brevo c'est acceptable pour un livre blanc, mais ne réutilisez pas cette clé pour d'autres usages sensibles, et révoquez-la si besoin depuis **Réglages → SMTP & API**. Pour un usage en production à fort trafic, faites transiter l'appel par une fonction serverless.

---

## Récapitulatif des 3 valeurs à renseigner

- [ ] `BREVO_API_KEY` — clé API (étape 6)
- [ ] `BREVO_LIST_ID` — ID de la liste `LP-Livre-Blanc` (étape 3)
- [ ] `BREVO_TEMPLATE_ID` — ID du template de confirmation (étape 5)

Une fois ces 3 valeurs renseignées et le test validé, votre landing page est prête à collecter des leads.
