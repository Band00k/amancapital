
# Aman Capital Stock Vault

A free, static, Netflix-style stock watchlist website designed for:

Instagram Reel / YouTube Short
→ Viewer comments `CROREPATI`
→ Automation sends this website link in DM
→ Viewer opens the full 5-stock research page
→ PDF download + Telegram/WhatsApp/YouTube/Instagram conversion

## Files

- `index.html` - page structure
- `styles.css` - complete responsive design
- `app.js` - cards, filters, modal, charts and email form
- `data.js` - edit all stock data and links here
- `assets/top-5-under-10-watchlist.pdf` - sample downloadable PDF

## First edits you must make

Open `data.js` and replace:

1. Telegram URL
2. WhatsApp invitation URL
3. YouTube URL
4. Instagram URL
5. Five sample stocks and their research details
6. Update date
7. Optional Formspree endpoint

## Free email capture with Formspree

1. Create a free account at Formspree.
2. Create a form.
3. Copy the endpoint, for example:
   `https://formspree.io/f/abcdwxyz`
4. Paste it into:

```js
formspreeEndpoint: "https://formspree.io/f/abcdwxyz"
```

Without Formspree, the demo stores submissions only in the visitor's own browser and you will not receive them.

## Deploy on GitHub + Cloudflare Pages

### Step 1: Create a GitHub repository

1. Sign in to GitHub.
2. Create a new public repository, for example `aman-stock-vault`.
3. Upload all files from this folder.
4. Commit the files.

### Step 2: Connect Cloudflare Pages

1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Choose Create application → Pages → Connect to Git.
4. Select your GitHub repository.
5. Framework preset: `None`
6. Build command: leave blank
7. Build output directory: `/`
8. Deploy.

Cloudflare will provide a free URL similar to:

`https://aman-stock-vault.pages.dev`

## Direct upload alternative

Cloudflare Pages also supports uploading a ZIP or folder in direct-upload mode. Upload the folder contents, not an extra nested folder, so `index.html` stays at the website root.

## DM automation message

```
🔥 Aapki complete Top 5 Under ₹10 Watchlist ready hai.

📊 Full research, risks, AI score aur PDF:
YOUR-CLOUDFLARE-LINK

⚠ Educational purpose only. Buy/sell recommendation nahi hai.
```

## Important compliance notes

- Clearly mark the content as educational.
- Do not promise returns.
- Do not use fake live prices.
- Mention the date of the data.
- Add source links to each stock description when publishing real research.
- "AI Score" should be presented as your editorial scoring system unless it is produced by a documented model.
