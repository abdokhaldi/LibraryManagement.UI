import { getPercentageClass } from '../../utils/dashboardHelpers';

function CategoryLine({ categoryName, percentage }) {
  const percentageClass = getPercentageClass(percentage);

  return (
    <div className="flex flex-col h-10 w-full">
      <div className="flex justify-between items-end h-full w-full mb-0">
        <p>{categoryName}</p>
        <p>{percentageClass.perNumber}</p>
      </div>
      <div className="bg-gray-300 w-full h-3 rounded-sm">
        <div className={`bg-green-500 h-full ${percentageClass.perColor} rounded-sm`}></div>
      </div>
    </div>
  );
}

export default CategoryLine;