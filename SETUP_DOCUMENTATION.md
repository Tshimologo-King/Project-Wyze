# Wyze Project - PostgreSQL + Prisma + NextAuth Setup Documentation

## Table of Contents
1. [Environment Variables Setup (.env.local)](#environment-variables-setup)
2. [Prisma Schema Structure](#prisma-schema-structure)
3. [Database Models Explained](#database-models-explained)
4. [Setup Steps Summary](#setup-steps-summary)

---

## Environment Variables Setup

### File Location
- **File Path**: `c:\Users\User\Desktop\PROJECT\project-wyze\.env.local`
- **Purpose**: Stores sensitive configuration values that should never be committed to GitHub
- **Scope**: Local development environment only

### How `.env.local` Was Created

**Step-by-Step Process:**

1. **File Creation**
   - Created as a new file in the project root directory
   - Named `.env.local` (note the dot prefix)
   - Contains sensitive credentials for local development

2. **File Content Structure**
   ```
   # PostgreSQL Database Connection
   DATABASE_URL="connection_string_here"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="secret_key_here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

### Environment Variables Defined

#### 1. **DATABASE_URL**
   - **Type**: String (Connection String)
   - **Purpose**: Tells Prisma and the app how to connect to PostgreSQL
   - **Format**: `postgresql://username:password@host:port/database_name`
   
   **Example Values:**
   ```
   # Local PostgreSQL
   postgresql://postgres:password123@localhost:5432/wyze_db
   
   # Railway.app
   postgresql://postgres:abc123xyz@containers.railway.app:7890/railway
   
   # Supabase
   postgresql://postgres:password@db.supabase.co:5432/postgres
   ```

   **Components Explained:**
   - `postgresql://` - Protocol (database type)
   - `postgres` - Username (default for PostgreSQL)
   - `password123` - Password (your database password)
   - `localhost` - Host/Server address (localhost for local, domain for managed services)
   - `5432` - Port number (5432 is default PostgreSQL port)
   - `wyze_db` - Database name

#### 2. **NEXTAUTH_SECRET**
   - **Type**: String (Hexadecimal or Base64)
   - **Purpose**: Encrypts session tokens and JWT tokens for security
   - **Length**: Minimum 32 characters
   - **How to Generate**:
     ```powershell
     # Option 1: Using Node.js
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     
     # Option 2: Using OpenSSL
     openssl rand -base64 32
     ```
   - **Security**: 
     - Never hardcode in source code
     - Generate a new secret for each environment
     - Store securely in `.env.local` (not in Git)

#### 3. **NEXTAUTH_URL**
   - **Type**: String (URL)
   - **Purpose**: Base URL where the application runs
   - **Local Development**: `http://localhost:3000`
   - **Production**: `https://yourdomain.com`
   - **Purpose in NextAuth**: Used for callback URLs and security validation

### .env.local Security Best Practices

1. **Never Commit to Git**
   - Add to `.gitignore`: `echo ".env.local" >> .gitignore`
   - Already ignored by default in Next.js projects

2. **Never Share Credentials**
   - Keep passwords private
   - Use unique passwords per environment
   - Rotate secrets regularly in production

3. **File Permissions**
   - Should only be readable by your user
   - Not accessible to web browsers
   - Only loaded server-side in Next.js

---

## Prisma Schema Structure

### File Location
- **File Path**: `c:\Users\User\Desktop\PROJECT\project-wyze\prisma\schema.prisma`
- **Purpose**: Defines the database structure and relationships
- **Language**: Prisma Data Model Language (similar to TypeScript)

### How Prisma Schema Was Created

**Step-by-Step Process:**

1. **Initialization Command**
   ```powershell
   npx prisma init
   ```
   - Creates `prisma/` folder
   - Creates `schema.prisma` file
   - Creates `.env.local` file

2. **Schema Configuration**
   - Updated generator settings
   - Connected to PostgreSQL datasource
   - Added database models

### Schema File Structure

#### Part 1: Generator Configuration
```prisma
generator client {
  provider = "prisma-client-js"
}
```
- **Purpose**: Generates Prisma Client (TypeScript/JavaScript interface)
- **Provider**: `prisma-client-js` - For JavaScript/TypeScript projects
- **Output**: Creates code to query the database

#### Part 2: Data Source Configuration
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
- **Provider**: `postgresql` - Specifies database type
- **URL**: Reads `DATABASE_URL` from `.env.local`
- **Purpose**: Tells Prisma how to connect to the database

---

## Database Models Explained

### Model 1: User (Authentication)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}
```

**Field Breakdown:**

| Field | Type | Attributes | Purpose |
|-------|------|-----------|---------|
| `id` | String | @id, @default(cuid()) | Unique identifier (auto-generated) |
| `email` | String | @unique | User's email (must be unique) |
| `name` | String? | Optional | User's display name |
| `password` | String? | Optional | Hashed password for login |
| `emailVerified` | DateTime? | Optional | Timestamp of email verification |
| `image` | String? | Optional | Profile picture URL |
| `createdAt` | DateTime | @default(now()) | Auto-timestamp on creation |
| `updatedAt` | DateTime | @updatedAt | Auto-updates on record change |
| `accounts` | Account[] | Relation | Connected OAuth accounts |
| `sessions` | Session[] | Relation | User's active sessions |

**Attributes Explained:**
- `@id` - Primary key (unique identifier)
- `@default(cuid())` - Auto-generates secure random ID
- `@unique` - Ensures no duplicate emails
- `?` - Optional field (nullable)
- `[]` - One-to-many relationship
- `@updatedAt` - Auto-updates timestamp

### Model 2: Account (OAuth Linking)

```prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

**Purpose**: Stores OAuth provider credentials (Google, GitHub, etc.)

**Key Fields:**
- `userId` - Foreign key linking to User
- `provider` - OAuth provider (e.g., "google", "github")
- `access_token` - OAuth token for API calls
- `refresh_token` - Token to refresh access_token
- `@db.Text` - Stores longer text in database
- `@@unique([provider, providerAccountId])` - Prevents duplicate OAuth accounts

### Model 3: Session (Session Management)

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Purpose**: Tracks user login sessions

**Fields:**
- `sessionToken` - Unique session identifier
- `userId` - User this session belongs to
- `expires` - When session becomes invalid
- `onDelete: Cascade` - Deletes session when user is deleted

### Model 4: VerificationToken (Email Verification)

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

**Purpose**: Stores tokens for email verification and password reset

**Fields:**
- `identifier` - Email address or user identifier
- `token` - Verification code
- `expires` - When token becomes invalid
- `@@unique([identifier, token])` - Compound unique constraint

### Model 5: Career (Job Data)

```prisma
model Career {
  id                    Int     @id @default(autoincrement())
  name                  String  @unique
  industry              String
  description           String
  whatItIs              String  @db.Text
  whatTheyDo            String  @db.Text
  skillsNeeded          String[]
  certifications        String[]
  tertiaryInstitutions  String[] @default([])
  image                 String
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

**Purpose**: Stores career information for the job platform

**Fields:**
- `id` - Auto-incrementing integer ID
- `name` - Career title (must be unique)
- `industry` - Industry category
- `description` - Short description
- `whatItIs` - Detailed explanation
- `whatTheyDo` - Job responsibilities
- `skillsNeeded` - Array of required skills
- `certifications` - Array of certifications
- `tertiaryInstitutions` - Array of universities/training institutions providing related courses
- `image` - Career image URL
- `createdAt`, `updatedAt` - Timestamps

**Array Fields:**
- `String[]` - PostgreSQL array type for multiple values
- Stored as JSON array in database
- `tertiaryInstitutions` example: `["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "Stellenbosch University"]`

---

## Prisma Special Attributes Reference

### Field Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `@id` | Primary key | `id String @id` |
| `@unique` | Unique constraint | `email String @unique` |
| `@default()` | Default value | `@default(now())` |
| `@updatedAt` | Auto-update timestamp | `updatedAt DateTime @updatedAt` |
| `@db.Text` | Large text field | `content String @db.Text` |
| `?` | Optional/nullable field | `name String?` |
| `[]` | Array type | `tags String[]` |

### Relation Attributes

| Attribute | Purpose |
|-----------|---------|
| `@relation()` | Define relationship between models |
| `fields: [userId]` | Which field stores foreign key |
| `references: [id]` | Which field it references |
| `onDelete: Cascade` | Delete records when referenced record is deleted |

---

## Data Types in Prisma

| Type | SQL Equivalent | Use Case |
|------|----------------|----------|
| `String` | VARCHAR | Text data |
| `Int` | INTEGER | Whole numbers |
| `Float` | FLOAT | Decimal numbers |
| `Boolean` | BOOLEAN | True/false |
| `DateTime` | TIMESTAMP | Date and time |
| `Bytes` | BYTEA | Binary data |
| `Json` | JSON | JSON objects |
| `String[]` | ARRAY | Multiple values |

---

## Setup Steps Summary

### Step 1: Initialize Prisma
```powershell
npx prisma init
```
- Creates `prisma/schema.prisma`
- Creates `.env.local`

### Step 2: Create `.env.local`
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generated_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Update `prisma/schema.prisma`
- Add database models
- Define relationships
- Set field types and attributes

### Step 4: Generate Prisma Client
```powershell
npx prisma migrate dev --name init
```
- Creates database tables
- Generates Prisma Client
- Ready for queries

### Step 5: View Database (Optional)
```powershell
npx prisma studio
```
- Opens graphical database explorer
- Available at `http://localhost:5555`

---

## Next Steps

1. **Get PostgreSQL Connection String**
   - Use Railway.app, Supabase, or local PostgreSQL
   - Copy connection URL

2. **Update `.env.local`**
   - Add `DATABASE_URL`
   - Add `NEXTAUTH_SECRET`

3. **Run Migrations**
   ```powershell
   npx prisma migrate dev --name init
   ```

4. **Create NextAuth Routes**
   - API routes for authentication
   - Signup and login pages

5. **Protect Routes**
   - Create middleware
   - Require authentication

---

## Common Prisma Commands

```powershell
# Create migration and sync database
npx prisma migrate dev --name description

# View database GUI
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Create migration without running it
npx prisma migrate dev --create-only
```

---

## File Structure After Setup

```
project-wyze/
├── .env.local              # ← Environment variables (NOT in Git)
├── .env.example            # ← Example for reference
├── prisma/
│   ├── schema.prisma       # ← Database models
│   └── migrations/         # ← Database change history
├── app/
│   ├── api/
│   ├── components/
│   ├── careers/
│   ├── page.tsx
│   └── layout.tsx
├── package.json
└── tsconfig.json
```

---

## Troubleshooting

### Issue: "DATABASE_URL not set"
**Solution**: Check `.env.local` exists and has `DATABASE_URL` defined

### Issue: "Can't reach database"
**Solution**: Verify connection string is correct and database is running

### Issue: Prisma Client not generating
**Solution**: Run `npx prisma generate` manually

### Issue: Migrations fail
**Solution**: Check database is accessible and all syntax is correct in schema

---

## Security Reminders

✅ **DO:**
- Store sensitive data in `.env.local`
- Generate strong NEXTAUTH_SECRET
- Use unique passwords per environment
- Add `.env.local` to `.gitignore`

❌ **DON'T:**
- Commit `.env.local` to Git
- Share credentials publicly
- Use weak secrets
- Hardcode passwords in code

---

**Last Updated**: January 20, 2026
**Project**: Wyze Career Platform
**Tech Stack**: Next.js 16, PostgreSQL, Prisma, NextAuth.js v4
