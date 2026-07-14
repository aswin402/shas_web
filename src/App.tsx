import { createHashRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CustomizerPage } from '@/pages/CustomizerPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { JournalPage } from '@/pages/JournalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'customizer',
        element: <CustomizerPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'journal',
        element: <JournalPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
