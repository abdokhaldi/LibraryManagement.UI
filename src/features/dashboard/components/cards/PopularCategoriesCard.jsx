import { POPULAR_CATEGORIES } from '../../constants';
import CardHeader from '../common/CardHeader';
import CategoryLine from '../charts/CategoryLine';

function PopularCategoriesCard({ title }) {
  return (
    <div className="flex flex-col sm:col-span-4 md:col-span-4 lg:sm:col-span-2 h-80 w-full bg-white rounded-lg shadow-gray-300 shadow-md p-4">
      <CardHeader title={title} />
      <div className="flex flex-col h-full w-full">
        {POPULAR_CATEGORIES.map((per) => (
          <CategoryLine key={per.categoryName} categoryName={per.categoryName} percentage={per.percentage} />
        ))}
      </div>
    </div>
  );
}

export default PopularCategoriesCard;