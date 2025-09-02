# Content Creators App

A React frontend application for managing content creators with full CRUD operations, built with Supabase integration.

## Features

- ✅ Display content creators with name, URL, description, and optional image
- ✅ View individual creator details
- ✅ Add new creators
- ✅ Edit existing creators
- ✅ Delete creators
- ✅ Responsive design with PicoCSS
- ✅ Supabase database integration
- ✅ React Router for navigation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to Settings > API
3. Copy your Project URL and API Key
4. Create a `.env` file in the project root with your credentials:

```bash
# Create .env file
touch .env
```

5. Add your Supabase credentials to the `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**⚠️ Important**: Never commit the `.env` file to git! It contains sensitive information.

### 3. Create Database Table

In your Supabase SQL editor, run this query to create the creators table:

```sql
CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  imageURL TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for development)
CREATE POLICY "Allow all operations" ON creators FOR ALL USING (true);
```

### 4. Seed the Database (Optional)

1. Start the development server: `npm start`
2. Navigate to `http://localhost:3000/seed`
3. Click "Seed Database" to populate with sample creators

### 5. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── CreatorList.js      # Main page showing all creators
│   ├── CreatorDetail.js    # Individual creator details page
│   ├── CreatorForm.js      # Form for adding/editing creators
│   └── SeedDatabase.js     # Database seeding utility
├── client.js               # Supabase client configuration
├── seedData.js            # Sample data for seeding
├── App.js                 # Main app component with routing
└── index.js               # App entry point
```

## API Endpoints

The app uses Supabase for all database operations:

- **GET** `/creators` - Fetch all creators
- **GET** `/creators/:id` - Fetch single creator
- **POST** `/creators` - Create new creator
- **PUT** `/creators/:id` - Update creator
- **DELETE** `/creators/:id` - Delete creator

## Sample Creators

The seed data includes popular content creators like:
- Linus Tech Tips
- MrBeast
- Marques Brownlee (MKBHD)
- PewDiePie
- Mark Rober
- Emma Chamberlain
- David Dobrik

## Technologies Used

- React 18
- React Router DOM
- Supabase
- PicoCSS
- JavaScript (ES6+)

## Development

To remove the seeding functionality after setup:

1. Remove the SeedDatabase import and route from `App.js`
2. Delete `src/components/SeedDatabase.js`
3. Delete `src/seedData.js`

## License

MIT