import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/productos?categoria=${category.id}`}
      className="group bg-white dark:bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
        <img
          src={category.image || '/placeholder-category.jpg'}
          alt={category.name}
          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
