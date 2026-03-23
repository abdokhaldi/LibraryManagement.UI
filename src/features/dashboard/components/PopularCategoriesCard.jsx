import HeaderChart from './HeaderChart'
import CategoryLine from "./CategoryLine";

function PopularCategoriesCard({title}){
  const percentage = [
   {categoryName:"Computer science", percentage:10},
   {categoryName:"Biology", percentage:20},
   {categoryName:"Chemistry", percentage:30},
   {categoryName:"Philosophy", percentage:40 },
   {categoryName:"History", percentage:50},
   {categoryName:"Languages", percentage:60},
  ];
    return (
        <div className="flex flex-col col-span-2 h-80 w-full bg-white rounded-lg shadow-gray-300 shadow-md p-4">
         <HeaderChart title={title} />
         <div className="flex flex-col h-full w-full">
         {
            percentage.map((per) => 
              (
                <CategoryLine categoryName={per.categoryName} percentage={per.percentage}/>
              )
            )
         }
         
         </div>
        </div>
    );
}
export default PopularCategoriesCard;