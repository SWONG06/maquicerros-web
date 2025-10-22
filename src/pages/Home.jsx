import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories } from '../services/products';

const Home = () => {
  // Mock data - en producción vendría de una API
  const featuredProducts = [
    {
      id: 1,
      name: 'Martillo Profesional',
      brand: 'Bosch',
      price: 45.99,
      image: '/product-hammer.jpg'
    },
    {
      id: 2,
      name: 'Taladro Inalámbrico',
      brand: 'DeWalt',
      price: 299.99,
      image: '/product-drill.jpg'
    },
    {
      id: 3,
      name: 'Pintura Acrílica 5L',
      brand: 'Sherwin-Williams',
      price: 89.99,
      image: '/product-paint.jpg'
    },
    {
      id: 4,
      name: 'Cinta Métrica 5m',
      brand: 'Stanley',
      price: 15.99,
      image: '/product-tape.jpg'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Banner */}
      <section className="bg-linear-to-r from-primary to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Compra herramientas profesionales fácilmente
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Encuentra las mejores herramientas y materiales para tus proyectos.
            Calidad garantizada y precios competitivos.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Productos Recomendados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
