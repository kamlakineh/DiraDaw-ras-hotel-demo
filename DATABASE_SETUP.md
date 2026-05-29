# Database Setup Instructions

This application uses **Drizzle ORM** with **Neon PostgreSQL** for the database and **UploadThing** for image storage.

## Prerequisites

1. **Neon Database Account**: Create a free account at [neon.tech](https://neon.tech)
2. **UploadThing Account**: Create an account at [uploadthing.com](https://uploadthing.com)

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DATA_BASE_URL=postgresql://user:password@host/database
UPLOADTHING_TOKEN=your_uploadthing_token_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
UPLOADTHING_SECRET=your_uploadthing_secret_here
```

### Getting Your Neon Database URL

1. Go to your Neon dashboard
2. Create a new project or select an existing one
3. Copy the connection string from the dashboard
4. Replace the connection string in your `.env` file

### Getting UploadThing Credentials

1. Go to [uploadthing.com](https://uploadthing.com)
2. Create a new app
3. Copy the App ID, Secret, and Token from the dashboard
4. Add them to your `.env` file

## Database Setup

### 1. Push Schema to Database

Run the following command to create the tables in your Neon database:

```bash
npm run db:push
```

This will create the following tables:
- `users` - Admin, manager, and reception users
- `rooms` - Hotel room types
- `restaurants` - Restaurant information
- `blogs` - Blog posts
- `reservations` - Restaurant reservations
- `bookings` - Room bookings

### 2. Seed Database

Run the seed script to create the default admin user and sample data:

```bash
npm run db:seed
```

This will create:
- **Default Admin User**: `diradaw` / `pass1234`
- Sample rooms (Normal, Superior, Deluxe)
- Sample restaurants (Jegol, The Terrace)

### 3. (Optional) Database Studio

To view and manage your database visually:

```bash
npm run db:studio
```

This will open Drizzle Studio in your browser.

## API Routes

The application includes the following API routes:

### Authentication
- `POST /api/auth/login` - User login

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room
- `PUT /api/rooms` - Update a room
- `DELETE /api/rooms?id={id}` - Delete a room

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `POST /api/restaurants` - Create a new restaurant
- `PUT /api/restaurants` - Update a restaurant
- `DELETE /api/restaurants?id={id}` - Delete a restaurant

### Blogs
- `GET /api/blogs` - Get all blog posts
- `POST /api/blogs` - Create a new blog post
- `PUT /api/blogs` - Update a blog post
- `DELETE /api/blogs?id={id}` - Delete a blog post

### UploadThing
- `GET /api/uploadthing` - UploadThing route handler
- `POST /api/uploadthing` - UploadThing route handler

## Image Upload

The application uses UploadThing for image storage. To upload images:

1. Make sure your UploadThing credentials are set in `.env`
2. Images are uploaded via the UploadThing component
3. The returned URL is stored in the database

## Troubleshooting

### Database Connection Error

If you get a database connection error:
- Verify your `DATA_BASE_URL` is correct in `.env`
- Check that your Neon database is active
- Ensure you have the correct permissions

### UploadThing Error

If image uploads fail:
- Verify your UploadThing credentials are correct
- Check that your app is configured in the UploadThing dashboard
- Ensure the file size is under 4MB (default limit)

### Migration Issues

If you encounter migration issues:
- Run `npm run db:push` to sync schema
- Check your Neon database console for any errors
- Ensure your schema in `db/schema.ts` is correct

## Default Credentials

After running the seed script, you can log in with:

- **Username**: `diradaw`
- **Password**: `pass1234`
- **Role**: `admin`

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production

For production deployment:

1. Set your environment variables in your hosting platform
2. Run `npm run build`
3. Run `npm start`
4. Ensure your Neon database is accessible from your production environment
