import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import PrivateRoute from "./components/PrivateRoute";

// 🔥 Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Orders = lazy(() => import('./pages/Orders'));
const OrderSuccess = lazy(() => import('./pages/CheckoutSuccess'));

const Perfil = lazy(() => import('./pages/Perfil'));

// Admin (opcional)
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminAddProduct = lazy(() => import('./pages/AdminAddProduct'));
const AdminEditProduct = lazy(() => import('./pages/AdminEditProduct'));

const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>

              <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

                  <Navbar />

                  <main>
                    <Suspense fallback={<Loading size="lg" text="Cargando página..." />}>

                      <Routes>
                        {/* PÚBLICAS */}
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<Products />} />
                        <Route path="/productos/:id" element={<ProductDetail />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Carrito es público */}
                        <Route path="/carrito" element={<Cart />} />

                        {/* PRIVADAS */}
                        <Route
                          path="/perfil"
                          element={
                            <PrivateRoute>
                              <Perfil />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/checkout"
                          element={
                            <PrivateRoute>
                              <Checkout />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/pedidos"
                          element={
                            <PrivateRoute>
                              <Orders />
                            </PrivateRoute>
                          }
                        />

                        <Route path="/pedido-exitoso" element={<OrderSuccess />} />

                        {/* ADMIN (solo si luego deseas activarlo) */}
                        <Route
                          path="/admin"
                          element={
                            <PrivateRoute adminOnly>
                              <AdminOrders />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/productos"
                          element={
                            <PrivateRoute adminOnly>
                              <AdminProducts />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/productos/nuevo"
                          element={
                            <PrivateRoute adminOnly>
                              <AdminAddProduct />
                            </PrivateRoute>
                          }
                        />

                        <Route
                          path="/admin/productos/editar/:id"
                          element={
                            <PrivateRoute adminOnly>
                              <AdminEditProduct />
                            </PrivateRoute>
                          }
                        />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />

                      </Routes>

                    </Suspense>
                  </main>

                  <Footer />

                </div>
              </Router>

            </CartProvider>
          </AuthProvider>
        </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
