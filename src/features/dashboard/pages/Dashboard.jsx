import { useEffect, useState } from 'react';
import { ANALYTICS_CARDS, CHART_TITLES } from '../constants';
import TotalAnalyticsCard from '../components/cards/TotalAnalyticsCard';
import WeekChartCard from '../components/cards/WeekChartCard';
import PopularCategoriesCard from '../components/cards/PopularCategoriesCard';
import ActivityTableCard from '../components/cards/ActivityTableCard';
import { getDashboardSummary } from '../../../services/dashboardService';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const result = await getDashboardSummary();
        if (result.success) {
          setDashboardData(result.data);
        } else {
          setError('Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 bg-gray-100 gap-6">
        <div className="col-span-4 flex items-center justify-center h-64">
          <div className="text-xl font-semibold text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-4 bg-gray-100 gap-6">
        <div className="col-span-4 flex items-center justify-center h-64 text-red-500">
          <div className="text-xl font-semibold">{error}</div>
        </div>
      </div>
    );
  }

  // Transform analytics data for the cards
  const analyticsCards = [
    {
      title: "MONTHLY LOANS",
      value: dashboardData?.analytics?.monthlyLoans?.toLocaleString() || "0",
      percentage: `${dashboardData?.analytics?.monthlyLoansChangePercentage >= 0 ? '+' : ''}${dashboardData?.analytics?.monthlyLoansChangePercentage?.toFixed(1) || '0'}% vs prev.`,
      color: "red"
    },
    {
      title: "NEW MEMBERS",
      value: dashboardData?.analytics?.newMembers?.toLocaleString() || "0",
      percentage: `${dashboardData?.analytics?.newMembersChangePercentage >= 0 ? '+' : ''}${dashboardData?.analytics?.newMembersChangePercentage?.toFixed(1) || '0'}% vs prev.`,
      color: "green"
    },
    {
      title: "REVENUE FROM FINES",
      value: `$${dashboardData?.analytics?.revenueFromFines?.toLocaleString() || '0'}`,
      percentage: `${dashboardData?.analytics?.revenueFromFinesChangePercentage >= 0 ? '+' : ''}${dashboardData?.analytics?.revenueFromFinesChangePercentage?.toFixed(1) || '0'}% vs prev.`,
      color: "amber"
    },
    {
      title: "INVENTORY UTIL %",
      value: `${dashboardData?.analytics?.inventoryUtilizationPercentage || '0'}%`,
      percentage: `${dashboardData?.analytics?.inventoryUtilizationChangePercentage >= 0 ? '+' : ''}${dashboardData?.analytics?.inventoryUtilizationChangePercentage?.toFixed(1) || '0'}% vs prev.`,
      color: "yellow"
    }
  ];

  return (
    <div className="grid grid-cols-4 bg-gray-100 gap-6">
      {analyticsCards.map((card) => (
        <TotalAnalyticsCard
          key={card.title}
          color={card.color}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
        />
      ))}
      <WeekChartCard 
        title={CHART_TITLES[1]} 
        weeklyData={dashboardData?.weeklyLoansTrend} 
      />
      <PopularCategoriesCard 
        title={CHART_TITLES[2]} 
        categories={dashboardData?.popularCategories} 
      />
      <ActivityTableCard 
        activities={dashboardData?.recentActivities} 
      />
    </div>
  );
}

export default Dashboard;