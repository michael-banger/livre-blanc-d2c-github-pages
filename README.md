# Landing Page — Livre Blanc IA & E-commerce D2C

Landing page de capture de leads (single-page, vanilla HTML/CSS/JS) pour distribuer le livre blanc par email Brevo après collecte de 4 champs : email professionnel, prénom, nom et entreprise.

## Contenu du projet

```
livre-blanc-d2c-github-pages/
├── index.html          ← landing page principale (CSS + JS inline)
├── privacy.html        ← politique de confidentialité (RGPD)
├── assets/
│   └── lb.pdf          ← le livre blanc téléchargeable
├── SETUP_BREVO.md      ← configuration Brevo (email automation)
├── README.md           ← ce fichier (déploiement)
└── deploy.sh           ← script de déploiement en une commande
```

## Avant la mise en ligne

1. **Configurer Brevo** : suivez `SETUP_BREVO.md` et renseignez les 3 valeurs (`BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_TEMPLATE_ID`) dans `index.html`.
2. **Compléter la politique de confidentialité** : remplacez `[CONTACT_EMAIL]` dans `privacy.html` par votre email de contact.
3. **Mettre à jour le lien du PDF** dans le template email Brevo (voir `SETUP_BREVO.md`).

---

## Déploiement sur GitHub Pages (gratuit)

### 1. Prérequis

- **Git** installé ([git-scm.com](https://git-scm.com)).
- Un **compte GitHub** gratuit ([github.com](https://github.com)).

### 2. Créer le dépôt GitHub

1. Allez sur [github.com](https://github.com) → bouton **New repository**.
2. **Name** : `livre-blanc-d2c-github-pages`.
3. **Visibility** : **Public** (obligatoire pour GitHub Pages gratuit).
4. Ne cochez **PAS** « Add a README » (il existe déjà).
5. Cliquez **Create repository**.

### 3. Pousser le code

Depuis un terminal, à la racine du projet :

```bash
cd livre-blanc-d2c-github-pages
git init
git add .
git commit -m "Initial landing page"
git remote add origin https://github.com/michael-banger/livre-blanc-d2c-github-pages.git
git branch -M main
git push -u origin main
```

### 4. Activer GitHub Pages

1. Dans le dépôt GitHub → **Settings** → **Pages**.
2. **Source** : *Deploy from a branch*.
3. **Branch** : `main` → dossier `/(root)` → **Save**.

### 5. Récupérer l'URL en ligne

Attendez 2-3 minutes. Votre page sera accessible à :

```
https://michael-banger.github.io/livre-blanc-d2c-github-pages/
```

Le PDF sera, lui, accessible à :

```
https://michael-banger.github.io/livre-blanc-d2c-github-pages/assets/lb.pdf
```

> 💡 C'est cette dernière URL qu'il faut coller dans le template email Brevo.

---

## Domaine personnalisé (optionnel)

1. Créez un fichier `CNAME` (sans extension) à la racine, contenant uniquement votre domaine, ex :
   ```
   livreblanc.mondomaine.com
   ```
2. Chez votre registrar DNS, configurez les enregistrements **A** vers les IP GitHub Pages :
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   (ou un enregistrement **CNAME** vers `michael-banger.github.io` pour un sous-domaine.)
3. Dans **Settings → Pages → Custom domain**, renseignez votre domaine et cochez **Enforce HTTPS**.

---

## Mises à jour

Après toute modification, redéployez en une commande :

```bash
./deploy.sh
```

Le script utilise déjà le dépôt `michael-banger/livre-blanc-d2c-github-pages`.
