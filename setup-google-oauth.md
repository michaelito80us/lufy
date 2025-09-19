# Google OAuth Setup Guide

To test the authentication system, you need to set up Google OAuth credentials:

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google/` (with trailing slash)

## 2. Update Environment Variables

Replace the placeholder values in `.env.local`:

```env
# Replace with your actual Google OAuth credentials
GOOGLE_CLIENT_ID="your-actual-google-client-id"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret"

# Generate a secure 32-character secret
BETTER_AUTH_SECRET="your-32-character-secret-key-here"
```

## 3. Set up the Database

Make sure you have PostgreSQL running and update the DATABASE_URL in `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lufy_db"
```

Then run:

```bash
pnpm db:push  # or npm run db:push
```

## 4. Test the Setup

1. Start the development server:

   ```bash
   pnpm dev  # or npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/login`

3. Click "Continue with Google" to test the OAuth flow

## 5. Quick Test Values (Development Only)

For immediate testing, you can use these temporary values:

```env
BETTER_AUTH_SECRET="abcdef1234567890abcdef1234567890"
DATABASE_URL="postgresql://user:password@localhost:5432/lufy_db"
```

**Important**: Replace these with secure values before deploying to production!
