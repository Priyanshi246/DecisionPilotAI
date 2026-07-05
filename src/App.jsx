import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, ThemeProvider, AppProvider } from './context';
import { Layout } from './components/layout';
import { Login, Signup, ForgotPassword } from './components/auth';
import {
  Dashboard,
  Upload,
  Datasets,
  Assistant,
  Forecast,
  Recommendations,
  Reports,
  Notifications,
  Profile,
  Settings
} from './pages';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/" element={<Landing />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/datasets" element={<Datasets />} />
                <Route path="/datasets/:id" element={<Datasets />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1E293B',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff'
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff'
                  }
                }
              }}
            />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
