import CardHeader from '../common/CardHeader';
import CategoryLine from '../charts/CategoryLine';

function PopularCategoriesCard({ title, categories }) {
  return (
    <div className="flex flex-col sm:col-span-4 md:col-span-4 lg:sm:col-span-2 h-80 w-full bg-white rounded-lg shadow-gray-300 shadow-md p-4">
      <CardHeader title={title} />
      <div className="flex flex-col h-full w-full">
        {categories?.map((cat) => (
          <CategoryLine key={cat.categoryName} categoryName={cat.categoryName} percentage={cat.percentage} />
        ))}
      </div>
    </div>
  );
}

export default PopularCategoriesCard;