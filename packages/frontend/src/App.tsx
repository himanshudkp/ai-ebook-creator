import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks";
import {
  ErrorBoundary,
  Login,
  ProtectedRoute,
  Register,
} from "./components/index";
import Dashboard from "./pages/Dashboard";
import EbookEditor from "./pages/EbookEditor";

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ebook/:id"
          element={
            <ProtectedRoute>
              <EbookEditor />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
