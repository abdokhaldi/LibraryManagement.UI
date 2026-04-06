import TotalAnalyticsCard from '../components/TotalAnalyticsCard';
import WeekChartCard from '../components/WeekChartCard';
import PopularCategoriesCard from '../components/PopularCategoriesCard';
import TableCard from '../components/TableCard';

function Dashboard() {
  
  const cardInfo = [
  {title:"MONTHLY LOANS", value:"2,842",percentage:"+12.5% vs prev.", color:"red"},
  {title:"NEW MEMBERS", value:"2,842",percentage:"+5.2% vs prev.", color:"green"},
  {title:"REVENUE FROM FINES", value:"2,842",percentage:"-2.4% vs prev.", color:"amber"},
  {title:"INVENTORY UTIL %", value:"2,842",percentage:"+3.1% vs prev.", color:"yellow"}
  ]
   
  

  const title = {1:"Loans trend" , 2:"Most Popular Categories"};

  const activities = [
    {id:1, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" },
    {id:2, memberName: "Jane Smith", bookTitle: "1984", action: "Returned", status: "Completed", time: "2:15 PM" },
     {id:3, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" },
    {id:4, memberName: "Jane Smith", bookTitle: "1984", action: "Returned", status: "Completed", time: "2:15 PM" },
     {id:5, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" }
   
  ];

  return (
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 gap-6'>
    
      {
           cardInfo.map( (card) => (
             
             <TotalAnalyticsCard key={card.title} color={card.color} title={card.title} value={card.value} percentage={card.percentage}/>
            ) )
     }
    
    <WeekChartCard title={title[1]} />
      <PopularCategoriesCard title={title[2]} />
      <TableCard activities={activities} />
    </div>
   );
  }

export default Dashboard;
      