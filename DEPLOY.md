# Deploy TutorMatch for Free

Repo: https://github.com/SIMBI-Gloria/TutorMatch-app

## Step 1 — Backend on Render (free)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New → Web Service**
3. Connect **SIMBI-Gloria/TutorMatch-app**
4. Settings:
   - **Name:** `tutormatch-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Add environment variables:
   - `JWT_SECRET` — long random string (32+ characters)
   - `FRONTEND_URL` — your Vercel URL (add after Step 2)
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` — Gmail settings (optional)
6. Click **Create Web Service**
7. Copy your API URL, e.g. `https://tutormatch-api.onrender.com`

## Step 2 — Frontend on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Add New Project** → import **TutorMatch-app**
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
4. Add environment variable:
   - `VITE_API_URL` = `https://tutormatch-api.onrender.com/api`
     (use your actual Render URL from Step 1)
5. Click **Deploy**
6. Copy your site URL, e.g. `https://tutormatch-app.vercel.app`

## Step 3 — Link them together

1. Go back to Render → your backend service → **Environment**
2. Set `FRONTEND_URL` to your Vercel URL (e.g. `https://tutormatch-app.vercel.app`)
3. Click **Save Changes** (Render will redeploy)

## Done!

Share your Vercel URL with students and tutors. They can sign up at **Get Started**.

### Notes

- Free Render API sleeps after 15 min — first visit may take ~30 seconds
- SQLite data may reset on redeploy (fine for starting out)
- You log in the same way: **Get Started** on your live site
