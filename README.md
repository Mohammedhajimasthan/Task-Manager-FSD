# 🚀 TaskMaster - Production-Ready Task Management App

A full-stack task management application built with Next.js 14, MongoDB, and modern security practices.

## ✨ Features

- 🔐 JWT Authentication with HTTP-only cookies
- 🛡️ Password hashing (bcrypt), input validation, encryption utilities
- 📱 Fully responsive modern UI with glassmorphism design
- ⚡ Fast APIs with pagination, filtering, and search
- 🗄️ Optimized MongoDB with proper indexing
- 📊 Real-time task management (CRUD)
- 🎨 Tailwind CSS with custom animations
- 🔒 Security headers and CORS protection
- 📝 TypeScript for type safety

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt, HTTP-only cookies
- **Styling**: Tailwind CSS, Glassmorphism effects
- **Development**: ESLint, PostCSS, Autoprefixer
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <your-repo>
   cd taskmaster
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ENCRYPTION_KEY=your_32_byte_base64_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Database Setup**
   - Ensure MongoDB is running
   - The app will automatically create collections and indexes

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
taskmaster/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/               # Authentication endpoints
│   │   │   ├── login/          # POST /api/auth/login
│   │   │   └── register/       # POST /api/auth/register
│   │   └── tasks/              # Task management endpoints
│   │       ├── route.ts        # GET/POST /api/tasks
│   │       └── [id]/           # Dynamic routes
│   │           └── route.ts    # PUT/DELETE /api/tasks/[id]
│   ├── dashboard/              # Dashboard page
│   │   └── page.tsx
│   ├── login/                  # Login page
│   │   └── page.tsx
│   ├── register/               # Register page
│   │   └── page.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── lib/                        # Utility libraries
│   ├── auth.js                 # Authentication helpers
│   ├── crypto.js               # Encryption utilities
│   └── db.js                   # Database connection
├── middleware/                 # Next.js middleware
│   └── authMiddleware.ts       # Authentication middleware
├── models/                     # Mongoose models
│   ├── Task.js                 # Task model
│   └── User.js                 # User model
├── public/                     # Static assets
├── eslint.config.mjs           # ESLint configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔒 Security Features

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt (12 rounds)
- Input validation and sanitization
- CORS protection with security headers
- XSS protection
- CSRF protection
- SQL injection prevention with Mongoose

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get user's tasks (with pagination/filtering/search)
  - Query params: `page`, `status`, `search`
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🎨 UI Components

- **Glassmorphism Design**: Modern frosted glass effects
- **Responsive Layout**: Mobile-first design approach
- **Custom Animations**: Smooth transitions and hover effects
- **Status Badges**: Color-coded task status indicators
- **Form Validation**: Real-time input validation
- **Loading States**: Skeleton loaders and spinners

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (via editor extensions)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `ENCRYPTION_KEY` | 32-byte base64 encryption key | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret | Optional |
| `NEXTAUTH_URL` | NextAuth URL | Optional |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables

### Railway/DigitalOcean
1. Use the provided Dockerfile
2. Set environment variables
3. Deploy with MongoDB database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Test all features before submitting PR
- Ensure code passes ESLint checks
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- Create an issue on GitHub
- Check existing issues for similar problems
- Provide detailed reproduction steps

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB and Mongoose for the database solution
- All contributors and the open-source community

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

## 📁 Project Structure

```
taskmaster/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── tasks/         # Task management endpoints
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── globals.css       # Global styles
├── lib/                   # Utility libraries
│   ├── auth.js           # Authentication helpers
│   ├── crypto.js         # Encryption utilities
│   └── db.js             # Database connection
├── middleware/            # Next.js middleware
├── models/               # Mongoose models
│   ├── User.js           # User model
│   └── Task.js           # Task model
└── public/               # Static assets
```

## 🔒 Security Features

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt (12 rounds)
- Input validation and sanitization
- CORS protection
- XSS protection headers
- CSRF protection

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user's tasks (with pagination/filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🎨 UI Components

- Glassmorphism design system
- Responsive layout for all devices
- Custom animations and transitions
- Dark/light mode ready
- Accessible components

## 🚀 Deployment

The app is ready for deployment on:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Build command: `npm run build`
- **Railway**: Database hosting included
- **Heroku**: Procfile included

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using Next.js and modern web technologies.