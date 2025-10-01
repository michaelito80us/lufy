# Supabase Migration Guide

This guide will help you migrate from your local PostgreSQL database to Supabase.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `lufy` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Get Your Supabase Credentials

Once your project is created, go to **Settings > API** and copy:

- **Project URL**: `https://[your-project-ref].supabase.co`
- **Project API Keys**:
  - `anon` `public` key (for client-side)
  - `service_role` `secret` key (for server-side)

## 3. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:

   ```env
   # Replace with your actual values
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
   
   NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
   SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
   
   # Generate a random string for Better Auth
   BETTER_AUTH_SECRET="your-random-secret-string-here"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

   **How to fill in the values:**
   - `[YOUR-PROJECT-REF]`: Found in your Supabase project URL
   - `[YOUR-PASSWORD]`: The database password you set when creating the project
   - `[YOUR-ANON-KEY]`: The `anon` `public` key from Settings > API
   - `[YOUR-SERVICE-ROLE-KEY]`: The `service_role` `secret` key from Settings > API

## 4. Run the Database Migration

### Option A: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-migration.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the migration

### Option B: Using Prisma

1. Generate Prisma client:

   ```bash
   pnpm db:generate
   ```

2. Push the schema to Supabase:

   ```bash
   pnpm db:push
   ```

## 5. Verify the Migration

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all your tables created:
   - `users`
   - `sessions`
   - `accounts`
   - `verifications`
   - `artists`
   - `tracks`
   - `beats`
   - `merchandise`
   - `shows`
   - `subscriptions`
   - etc.

## 6. Update Your Application Code

### Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

## 7. Test Your Application

1. Start your development server:

   ```bash
   pnpm dev
   ```

2. Test key functionality:
   - User authentication
   - Database operations
   - File uploads (if using Supabase Storage)

## 8. Optional: Set Up Supabase Storage

If you're storing files (music, images), set up Supabase Storage:

1. Go to **Storage** in your Supabase dashboard
2. Create buckets for your files:
   - `tracks` (for audio files)
   - `covers` (for cover art)
   - `avatars` (for user avatars)
3. Set up appropriate policies for each bucket

## 9. Row Level Security (RLS)

The migration includes basic RLS policies. Review and customize them based on your needs:

1. Go to **Authentication > Policies** in Supabase
2. Review the policies for each table
3. Modify as needed for your security requirements

## Troubleshooting

### Connection Issues

- Ensure your DATABASE_URL is correct
- Check that your database password is properly URL-encoded
- Verify your project reference is correct

### Migration Errors

- Check the SQL Editor for error messages
- Ensure all required extensions are enabled
- Verify table relationships are correct

### Authentication Issues

- Ensure Better Auth is properly configured
- Check that session and account tables exist
- Verify RLS policies allow proper access

## Next Steps

1. **Set up CI/CD**: Configure your deployment pipeline to use Supabase
2. **Monitoring**: Set up logging and monitoring in Supabase
3. **Backups**: Configure automated backups
4. **Performance**: Review and optimize your database queries
5. **Security**: Review and tighten RLS policies

## Useful Commands

```bash
# Generate Prisma client
pnpm db:generate

# Push schema changes to Supabase
pnpm db:push

# Open Prisma Studio
pnpm db:studio

# Create a new migration
pnpm db:migrate

# Reset database (careful!)
pnpm db:reset

# Deploy migrations in production
pnpm db:deploy
```

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma with Supabase](https://supabase.com/docs/guides/integrations/prisma)
- [Better Auth Documentation](https://www.better-auth.com/docs)
