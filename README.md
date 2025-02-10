# Shopping List App

A modern, full-stack shopping list application built with Next.js, Supabase, and Tailwind CSS. The app features user authentication, real-time updates, and a clean, intuitive interface for managing shopping lists.

Deployed site: [https://shopping-list-next-woad.vercel.app/](https://shopping-list-next-woad.vercel.app/)

## Features

- 🔐 User Authentication (Email and Google Sign-in)
- 📝 Create, Read, Update, and Delete shopping items
- 🔄 Real-time updates
- 📱 Responsive design
- 🔍 Advanced filtering and sorting options
- ✅ Item status tracking (packed/unpacked)

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm/yarn
- Supabase account
- Google Cloud Console project (for Google Sign-in)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shopping-list-next.git
cd shopping-list-next
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up your Supabase database by running the following SQL commands:
```sql
-- Create shopping items table
create table public.shopping_items (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users(id),
  description text not null,
  quantity integer not null,
  category text not null,
  unit text,
  priority text,
  store text,
  estimated_price numeric,
  notes text,
  packed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.shopping_items enable row level security;

-- Create policy
create policy "Users can only view their own items"
  on public.shopping_items
  for all
  using (auth.uid() = user_id);
```

5. Configure Google Authentication:
    - Create a project in Google Cloud Console
    - Set up OAuth 2.0 credentials
    - Add authorized redirect URI from Supabase
    - Add credentials to Supabase Auth settings

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel project settings:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Key Features Explained

### Authentication
- Email/Password authentication
- Google OAuth integration
- Protected routes and data

### Shopping List Management
- Add items with detailed information
- Mark items as packed/unpacked
- Delete individual items or clear entire list
- Add notes and priority levels

### Filtering and Sorting
- Sort by input order, name, price, or priority
- Filter by priority, store, and category
- Search functionality
- Active filters display

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

