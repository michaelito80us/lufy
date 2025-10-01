-- Supabase Migration SQL
-- Run this in your Supabase SQL Editor to create the database schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication (compatible with Better Auth)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Better Auth uses text IDs
    email TEXT UNIQUE NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false,
    username TEXT UNIQUE,
    name TEXT,
    image TEXT,
    role TEXT DEFAULT 'SUBSCRIBER' CHECK (role IN ('ARTIST', 'SUBSCRIBER', 'ADMIN')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for Better Auth
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table for Better Auth
CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
    "refreshTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
    scope TEXT,
    password TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("providerId", "accountId")
);

-- Verification table for Better Auth
CREATE TABLE IF NOT EXISTS verifications (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(identifier, value)
);

-- Artists table
CREATE TABLE IF NOT EXISTS artists (
    id TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "stageName" TEXT NOT NULL,
    bio TEXT,
    website TEXT,
    "socialLinks" JSONB,
    tier TEXT DEFAULT 'BASIC' CHECK (tier IN ('BASIC', 'PRO', 'PREMIUM')),
    "isActive" BOOLEAN DEFAULT true,
    "brandColors" JSONB,
    logo TEXT,
    "bannerImage" TEXT,
    "subscriptionPrice" DECIMAL(10, 2),
    "subscriptionActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
    id TEXT PRIMARY KEY,
    "artistId" TEXT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "audioUrl" TEXT NOT NULL,
    "coverArt" TEXT,
    duration INTEGER,
    genre TEXT,
    "isExclusive" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "playCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Beats table
CREATE TABLE IF NOT EXISTS beats (
    id TEXT PRIMARY KEY,
    "artistId" TEXT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "audioUrl" TEXT NOT NULL,
    "fullAudioUrl" TEXT,
    "coverArt" TEXT,
    bpm INTEGER,
    key TEXT,
    genre TEXT,
    price DECIMAL(10, 2) NOT NULL,
    "isExclusive" BOOLEAN DEFAULT false,
    tags TEXT[],
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Beat sales table
CREATE TABLE IF NOT EXISTS beat_sales (
    id TEXT PRIMARY KEY,
    "beatId" TEXT NOT NULL REFERENCES beats(id) ON DELETE CASCADE,
    "buyerId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Merchandise table
CREATE TABLE IF NOT EXISTS merchandise (
    id TEXT PRIMARY KEY,
    "artistId" TEXT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    images TEXT[],
    category TEXT NOT NULL,
    sizes TEXT[],
    colors TEXT[],
    inventory INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Merchandise orders table
CREATE TABLE IF NOT EXISTS merch_orders (
    id TEXT PRIMARY KEY,
    "merchId" TEXT NOT NULL REFERENCES merchandise(id) ON DELETE CASCADE,
    "buyerId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    size TEXT,
    color TEXT,
    "totalPrice" DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    "shippingInfo" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shows table
CREATE TABLE IF NOT EXISTS shows (
    id TEXT PRIMARY KEY,
    "artistId" TEXT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    venue TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    doors TIMESTAMP WITH TIME ZONE,
    "ticketPrice" DECIMAL(10, 2),
    "ticketUrl" TEXT,
    "isExclusive" BOOLEAN DEFAULT false,
    capacity INTEGER,
    "soldOut" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "artistId" TEXT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAUSED')),
    "startDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP WITH TIME ZONE,
    price DECIMAL(10, 2) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("userId", "artistId")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions("userId");
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts("userId");
CREATE INDEX IF NOT EXISTS idx_artists_user_id ON artists("userId");
CREATE INDEX IF NOT EXISTS idx_tracks_artist_id ON tracks("artistId");
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre);
CREATE INDEX IF NOT EXISTS idx_beats_artist_id ON beats("artistId");
CREATE INDEX IF NOT EXISTS idx_beat_sales_beat_id ON beat_sales("beatId");
CREATE INDEX IF NOT EXISTS idx_beat_sales_buyer_id ON beat_sales("buyerId");
CREATE INDEX IF NOT EXISTS idx_merchandise_artist_id ON merchandise("artistId");
CREATE INDEX IF NOT EXISTS idx_merch_orders_merch_id ON merch_orders("merchId");
CREATE INDEX IF NOT EXISTS idx_merch_orders_buyer_id ON merch_orders("buyerId");
CREATE INDEX IF NOT EXISTS idx_shows_artist_id ON shows("artistId");
CREATE INDEX IF NOT EXISTS idx_shows_date ON shows(date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions("userId");
CREATE INDEX IF NOT EXISTS idx_subscriptions_artist_id ON subscriptions("artistId");

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE beat_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE merch_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can customize these based on your needs)
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id);

-- Artists can manage their own content
CREATE POLICY "Artists can manage own content" ON artists FOR ALL USING (auth.uid()::text = "userId");
CREATE POLICY "Artists can manage own tracks" ON tracks FOR ALL USING (auth.uid()::text = (SELECT "userId" FROM artists WHERE id = "artistId"));
CREATE POLICY "Artists can manage own beats" ON beats FOR ALL USING (auth.uid()::text = (SELECT "userId" FROM artists WHERE id = "artistId"));
CREATE POLICY "Artists can manage own merchandise" ON merchandise FOR ALL USING (auth.uid()::text = (SELECT "userId" FROM artists WHERE id = "artistId"));
CREATE POLICY "Artists can manage own shows" ON shows FOR ALL USING (auth.uid()::text = (SELECT "userId" FROM artists WHERE id = "artistId"));

-- Public read access for public content
CREATE POLICY "Public tracks are viewable by everyone" ON tracks FOR SELECT USING ("isPublic" = true);
CREATE POLICY "Public beats are viewable by everyone" ON beats FOR SELECT USING (true);
CREATE POLICY "Public merchandise is viewable by everyone" ON merchandise FOR SELECT USING ("isActive" = true);
CREATE POLICY "Public shows are viewable by everyone" ON shows FOR SELECT USING (true);
CREATE POLICY "Public artists are viewable by everyone" ON artists FOR SELECT USING ("isActive" = true);

-- Users can manage their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Users can create subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Users can update own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid()::text = "userId");

