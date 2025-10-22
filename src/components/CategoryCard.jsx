import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/productos?categoria=${encodeURIComponent(category.name)}`}
      className="
        block bg-white dark:bg-secondary rounded-xl 
        shadow-md hover:shadow-2xl
        overflow-hidden 
        transform transition-all duration-300 
        hover:-translate-y-1 hover:scale-[1.02]
        border border-transparent hover:border-primary/30
      "
    >
      {/* Imagen */}
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
        <img
          src={category.imageUrl || "/placeholder-category.jpg"}
          alt={category.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {category.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {category.description || "Explora los productos de esta categoría."}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
