# Orion

A modern SaaS AI-powered customer support platform built with Next.js, featuring intelligent conversation management, real-time messaging, and customizable AI-driven widgets.

## 🏗️ Project Structure

This is a monorepo workspace managed with **pnpm** and **Turbo**, organized into the following structure:

### 📱 Applications (`apps/`)

#### `web/` - Main Dashboard Application
- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk authentication integration
- **Features**:
  - Customer support dashboard
  - AI-powered conversation management
  - Real-time chat interface
  - Knowledge base management
  - Widget customization interface
  - Organization and user management
  - File management system
  - Billing and subscription management
- **Ports**: Runs on port 3000

#### `widget/` - Embeddable Customer Support Widget
- **Framework**: Next.js with Turbopack
- **Features**:
  - Lightweight embeddable chat widget
  - Real-time messaging capabilities
  - Customizable appearance and branding
  - Voice integration with Vapi AI
  - Easy integration for client websites
- **Ports**: Runs on port 3001

### 📦 Packages (`packages/`)

#### `backend/` - Convex Backend
- **Database**: Convex real-time database
- **AI Integration**: Google Gemini 2.0 Flash Lite for message enhancement
- **Features**:
  - Real-time conversation management
  - AI-powered message processing and enhancement
  - User and organization management
  - Contact session handling with metadata tracking
  - File storage and management
  - Support agent system
- **Core Entities**:
  - Conversations with status tracking (unresolved, escalated, resolved)
  - Contact sessions with browser/device metadata
  - Users and organizations
  - Real-time messaging with AI enhancement

#### `ui/` - Shared Component Library
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Features**:
  - Complete design system with 40+ components
  - AI-specific components (AIResponse, AITool, AIReasoning, etc.)
  - Chart and data visualization components
  - Navigation and layout components
  - Form and input components
  - Consistent theming and styling

#### `math/` - Utility Library
- Simple mathematical operations
- Shared utility functions

#### `eslint-config/` - Shared ESLint Configuration
- Base ESLint rules
- Next.js specific configurations
- React internal configurations

#### `typescript-config/` - Shared TypeScript Configuration
- Base TypeScript settings
- Next.js specific configurations
- React library configurations

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20
- **pnpm**: 10.4.1
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FabianTrafada/Orion.git
   cd Orion
   ```

2. **Install turbo as global dependency**
   ```bash
   pnpm add turbo --global
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env.local` in both `apps/web` and `apps/widget`
   - Configure Clerk authentication keys
   - Set up Convex deployment URL
   - Configure AI provider keys (Google Gemini)

5. **Set up Convex backend**
   ```bash
   cd packages/backend
   pnpm setup
   ```

### Development

Start all applications and services in development mode:

```bash
turbo dev
```

This will start:
- **Web Dashboard**: http://localhost:3000
- **Widget**: http://localhost:3001
- **Convex Backend**: Real-time database and functions

### Building for Production

```bash
turbo build
```

## 🔧 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Hook Form** - Form management
- **Clerk** - Authentication and user management

### Backend
- **Convex** - Real-time database and backend functions
- **Google Gemini 2.0** - AI message enhancement
- **Vapi AI** - Voice integration for widget

### Development Tools
- **Turbo** - Monorepo build system
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Sentry** - Error monitoring and performance tracking

## 📁 Key Features

### 🤖 AI-Powered Support
- Automatic message enhancement for support agents
- AI-powered conversation assistance
- Smart response suggestions

### 💬 Real-Time Messaging
- Live chat between customers and support agents
- Real-time conversation updates
- Message status tracking

### 🎨 Customizable Widget
- Embeddable chat widget for any website
- Customizable appearance and branding
- Voice chat capabilities

### 👥 Multi-Organization Support
- Organization-based user management
- Role-based access control
- Team collaboration features

### 📊 Analytics & Reporting
- Conversation status tracking
- Performance metrics
- Support analytics dashboard

### 🔒 Security & Authentication
- Secure authentication with Clerk
- Organization-based data isolation
- Real-time security updates

## 🌐 Deployment

The project is configured for easy deployment with:
- **Vercel** for frontend applications
- **Convex Cloud** for backend services
- **Environment-based configuration**

## 📖 Documentation

- [Convex Documentation](https://docs.convex.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live Demo](#) - Coming soon