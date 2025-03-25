
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// For separate admin URL (admin.mysite.com):
// In production, you would use:
// 1. Separate deployment for the admin app
// 2. Environment variables to determine which app to render
// 3. Domain-specific routing at the hosting/DNS level
//
// For development, we're using the /admin route path within the same app
// but in production these would be separate deployments

createRoot(document.getElementById("root")!).render(<App />);
