import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { CookPage } from './pages/CookPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { HomePage } from './pages/HomePage';
import { IngredientsPage } from './pages/IngredientsPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { RecipesPage } from './pages/RecipesPage';
import { SavedPage } from './pages/SavedPage';
import { ToolsPage } from './pages/ToolsPage';

export default function App() {
  const location = useLocation();
  const cooking = location.pathname.startsWith('/cook/');

  return (
    <div className="min-h-dvh bg-[#d9cfc0]">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden bg-ivory shadow-[0_0_80px_rgba(43,41,37,0.12)]">
        <Routes>
          <Route element={<AppShell hideNav={cooking} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="/cook/:id" element={<CookPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
