# Nynepay - E-commerce Platform

🌐 **Live Demo**: [https://nynepay.netlify.app/](https://nynepay.netlify.app/)

Nynepay is a modern e-commerce platform built with React and Firebase, offering a seamless shopping experience with features like product browsing, category management, and secure payments.

## Features

- 🛍️ **Product Management**
  - Browse products by categories
  - Detailed product views
  - Product carousels for featured items
  - Admin panel for product management

- 📱 **User Features**
  - User authentication (login/register)
  - User profiles
  - Shopping cart functionality
  - Order management
  - Wallet system

- 🎯 **Admin Features**
  - Product management
  - Category management
  - User management
  - Order tracking
  - Winner management
  - Bid list management

- 💳 **Payment Integration**
  - Secure payment processing
  - Razorpay integration
  - Transaction history

## Tech Stack

- **Frontend**
  - React.js
  - Chakra UI
  - Bootstrap
  - React Router

- **Backend**
  - Firebase
  - Firestore
  - Firebase Authentication
  - Firebase Storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/ankitklakra/nynepay.git
cd nynepay
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment Variables
   - Create a `.env` file in the root directory
   - Add the following variables with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
   - Get these values from your Firebase project settings
   - Never commit the `.env` file to version control

4. Start the development server
```bash
npm start
```

## Deployment to Netlify

### Method 1: Deploy via Netlify UI

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/) and sign up/login
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables:
   - Go to Site settings > Build & deploy > Environment
   - Add all your Firebase environment variables
7. Click "Deploy site"

### Method 2: Deploy via Netlify CLI

1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

2. Login to Netlify
```bash
netlify login
```

3. Initialize your site
```bash
netlify init
```

4. Deploy your site
```bash
netlify deploy --prod
```

### Environment Variables in Netlify

1. Go to your site's dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables:
   ```
   REACT_APP_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID
   REACT_APP_FIREBASE_MEASUREMENT_ID
   ```

### Important Notes for Deployment

1. Make sure all environment variables are set in Netlify
2. Enable CORS in Firebase if needed
3. Update Firebase Authentication settings to allow your Netlify domain
4. Test the deployment in a staging environment first

## Project Structure

```
src/
├── Components/
│   ├── AdminPages/      # Admin panel components
│   ├── Cards/           # Reusable card components
│   ├── CategoryPages/   # Category-specific pages
│   ├── MenuPages/       # Main menu pages
│   ├── ProductCarousel/ # Product carousel components
│   └── Mapping/         # Data mapping components
├── Config/              # Configuration files
├── Resources/           # Static resources
└── hooks/              # Custom React hooks
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@nynepay.com or create an issue in the repository.

## Acknowledgments

- Firebase for backend services
- Chakra UI for the component library
- React community for the amazing ecosystem
