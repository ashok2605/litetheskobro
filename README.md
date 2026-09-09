# Lite Thesko Bro · litetheskobro.com

**Lite thesko, bro** = "take it light, bro". The most Telugu way of saying chill. This site is a Telugu tension-relief machine built to be shared on WhatsApp.

What it does:

- **Tension cheppu (Tell your tension).** Type anything in Telugu, English or Tenglish. The site detects the category (love, office, exams, money, family, Hyderabad, cricket, friends), scores a tension level out of 10, and prescribes a Telugu "lite thesko" one-liner with a Rx.
- **Shareable meme card.** One tap renders a 1080x1080 card (your tension + the line + the meter) and shares it via the native share sheet on phones (WhatsApp, Instagram, status). On desktop it opens WhatsApp Web with the text. Download and copy also work.
- **Rojuko line (One a day).** A deterministic quote of the day, the same for everyone, so people come back and forward it.
- **Meme wall.** Nine ready-made cards to download.
- **Store (coming soon).** T-shirt, mug, sticker pack mockups with a waitlist mail link. This is the monetisation hook.
- **Submit your line.** User-generated lines by mail.

Everything is written in Tenglish (Telugu in English script) so it reads on any phone without Telugu font support and stays meme-friendly. Plain HTML, CSS and vanilla JS. No build step, no backend, no tracking. Nothing the visitor types leaves their device. Font: Anek Latin from Google Fonts (system fonts as fallback).

## Files

| File | Purpose |
|---|---|
| `index.html` | The page |
| `style.css` | Styling. Palette lives in `:root` |
| `script.js` | Quotes (`QUOTES`), categories and keyword detection (`CATS`, `KEYWORDS`), tension meter, canvas card renderer, share/download/copy, daily quote, meme wall |
| `404.html` | Tenglish not-found page (auto-used by GitHub Pages, Cloudflare Pages, Netlify, Vercel) |
| `og.png` | 1200x630 social preview referenced in the meta tags |
| `favicon.svg` | Tab icon |
| `CNAME` | Custom domain for GitHub Pages. Harmless elsewhere |
| `.nojekyll` | Stops GitHub Pages running Jekyll |
| `robots.txt` | Allows indexing |
| `tests/` | Playwright browser tests and the OG image template |

## Preview locally

```sh
cd ~/Desktop/litetheskobro
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly also works. `404.html` needs the server because it uses root-absolute paths.

## Browser tests

`tests/test_site.py` drives the installed Google Chrome through Playwright: types a tension, checks auto-detection and the meter, clicks Inkoti, copies, downloads the PNG card, confirms the share button opens WhatsApp on desktop and the native share sheet with an image on phones, exercises the daily and meme-wall buttons, runs keyword-detection cases, checks the phone layout for overflow, and regenerates `og.png`.

```sh
uv run --with playwright python tests/test_site.py
```

Screenshots and downloaded cards land in `tests/out/` (git-ignored).

## Growing it (ideas, in order of effort)

1. **Add lines.** Every new line is a new shareable card. Add objects to `QUOTES` in `script.js`. Keep them short, Tenglish-friendly and specific (biryani, Ameerpet, month-end, family WhatsApp groups).
2. **Instagram + WhatsApp channel.** Post the daily card every morning. The `@litetheskobro` handle is a placeholder link in the store section; change it once the account exists.
3. **Free analytics.** Cloudflare Web Analytics or GoatCounter, both free and cookie-less. Track which categories and share buttons get used.
4. **WhatsApp sticker pack.** Export the cards at 512x512 WebP and publish through a sticker-maker app. Huge for Telugu group chats.
5. **Merch.** Print-on-demand (Printrove, Qikink, Teespring) means zero stock. Swap the "Coming soon" tags for real product links.
6. **Backend later.** A tiny worker (Cloudflare Workers free tier) could count total tensions lightened and accept submitted lines without email.

## Free hosting options

All of these serve a static folder for free with a custom domain and HTTPS.

| Host | Free tier | Best for | Apex domain (`litetheskobro.com`) |
|---|---|---|---|
| **GitHub Pages** | Unlimited sites, 100 GB/month soft limit, public repo required | Fastest path here: `gh` is already logged in | 4 A records at Namecheap |
| **Cloudflare Pages** | Unlimited bandwidth, 500 deploys/month | Best long-term free tier, global CDN, India edge nodes | Move nameservers to Cloudflare (free) |
| **Netlify** | 100 GB/month, drag-and-drop deploys | Zero-git deploys | 1 A record at Namecheap |
| **Vercel** | Hobby plan, personal/non-commercial use | Git-connected previews | 1 A record at Namecheap |
| Render / Surge / Firebase Hosting | Also free for static sites | Alternatives | Varies |

Neocities is free but charges for custom domains. If the site goes viral, Cloudflare Pages is the one with no bandwidth ceiling; Vercel's Hobby plan forbids commercial use, so move off it before selling merch.

### Option A: GitHub Pages (recommended to start)

1. Push the folder to a new public repo:

   ```sh
   cd ~/Desktop/litetheskobro
   git init -b main
   git add .
   git commit -m "Lite thesko bro"
   gh repo create litetheskobro --public --source=. --push
   ```

2. Turn on Pages from the `main` branch root:

   ```sh
   gh api -X POST repos/ashok2605/litetheskobro/pages \
     -f "source[branch]=main" -f "source[path]=/"
   ```

   Or in the browser: repo → Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.

3. In Namecheap: Domain List → **Manage** → **Advanced DNS**. Delete the default parking records (the `URL Redirect` for `@` and the `CNAME` for `www`), then add:

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | A | `@` | `185.199.108.153` | Automatic |
   | A | `@` | `185.199.109.153` | Automatic |
   | A | `@` | `185.199.110.153` | Automatic |
   | A | `@` | `185.199.111.153` | Automatic |
   | CNAME | `www` | `ashok2605.github.io` | Automatic |

4. Back on GitHub: Settings → Pages → **Custom domain** → `litetheskobro.com` → Save. The `CNAME` file in this repo does the same thing, so it may already be filled in. Once the DNS check passes (usually 5 to 30 minutes, up to 48 hours), tick **Enforce HTTPS**.

### Option B: Cloudflare Pages (best free tier)

1. Sign up at dash.cloudflare.com (free). **Add a site** → `litetheskobro.com` → Free plan. Cloudflare shows two nameservers.
2. In Namecheap: Domain List → Manage → **Nameservers** → **Custom DNS** → paste the two Cloudflare nameservers. Cloudflare emails you when it becomes active.
3. Cloudflare dashboard → **Workers & Pages** → Create → **Pages**. Either **Connect to Git** (pick the repo from Option A, framework preset *None*, no build command, output directory `/`) or **Direct Upload** and drag this folder in.
4. Pages project → **Custom domains** → add `litetheskobro.com` and `www.litetheskobro.com`. Cloudflare creates the DNS records and the certificate itself.

Because the nameservers move, use **Cloudflare Email Routing** (free) instead of Namecheap's email forwarding for `hello@litetheskobro.com`.

### Option C: Netlify (no git needed)

1. Go to app.netlify.com/drop and drag this folder onto the page. You get a `something.netlify.app` URL immediately.
2. Site → **Domain management** → Add custom domain → `litetheskobro.com`.
3. In Namecheap Advanced DNS:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `75.2.60.5` |
   | CNAME | `www` | `<your-site>.netlify.app` |

### Option D: Vercel

1. Import the GitHub repo at vercel.com/new (framework *Other*, no build command, output directory `.`).
2. Project → Settings → **Domains** → add `litetheskobro.com`.
3. In Namecheap Advanced DNS:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

## The contact address

The page uses `hello@litetheskobro.com` for the store waitlist and line submissions. To make it real for free:

- **Staying on Namecheap DNS** (Options A, C, D): Domain List → Manage → **Redirect Email** → add `hello` → forward to your real address. Namecheap sets the MX records for you.
- **On Cloudflare nameservers** (Option B): Email → **Email Routing** → add `hello@` → forward to your real address.

## Customising

- Palette: `:root` in `style.css`. Category card colours: `CATS` in `script.js`.
- Quotes: `QUOTES` in `script.js`. Each has `c` (category), `line` (Tenglish), `en` (meaning).
- Meme wall picks: the `picks` array of quote indexes in `script.js`.
- Social image: regenerate `og.png` by screenshotting a 1200x630 hero, or drop in any 1200x630 PNG.
