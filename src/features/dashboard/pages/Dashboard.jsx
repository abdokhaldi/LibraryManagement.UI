import { ANALYTICS_CARDS, CHART_TITLES } from '../constants';
import TotalAnalyticsCard from '../components/cards/TotalAnalyticsCard';
import WeekChartCard from '../components/cards/WeekChartCard';
import PopularCategoriesCard from '../components/cards/PopularCategoriesCard';
import ActivityTableCard from '../components/cards/ActivityTableCard';

function Dashboard() {
  return (
    <div className="grid grid-cols-4 bg-gray-100 gap-6">
      {ANALYTICS_CARDS.map((card) => (
        <TotalAnalyticsCard
          key={card.title}
          color={card.color}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
        />
      ))}
      <WeekChartCard title={CHART_TITLES[1]} />
      <PopularCategoriesCard title={CHART_TITLES[2]} />
      <ActivityTableCard />
    </div>
  );
}

export default Dashboard;