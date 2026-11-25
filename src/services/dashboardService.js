import { apiRequest } from './helpers';

export const getDashboardSummary = async () => {
    try {
        const { ok, data } = await apiRequest('Dashboard/summary');
        if (!ok) {
            throw new Error('Failed to fetch dashboard summary');
        }
        return { success: true, data };
    } catch (error) {
        console.error('Service Error:', error.message);
        throw error;
    }
};

export const getDashboardAnalytics = async () => {
    try {
        const { ok, data } = await apiRequest('Dashboard/analytics');
        if (!ok) {
            throw new Error('Failed to fetch dashboard analytics');
        }
        return { success: true, data };
    } catch (error) {
        console.error('Service Error:', error.message);
        throw error;
    }
};

export const getWeeklyLoansTrend = async () => {
    try {
        const { ok, data } = await apiRequest('Dashboard/weekly-trend');
        if (!ok) {
            throw new Error('Failed to fetch weekly loans trend');
        }
        return { success: true, data };
    } catch (error) {
        console.error('Service Error:', error.message);
        throw error;
    }
};

export const getPopularCategories = async () => {
    try {
        const { ok, data } = await apiRequest('Dashboard/popular-categories');
        if (!ok) {
            throw new Error('Failed to fetch popular categories');
        }
        return { success: true, data };
    } catch (error) {
        console.error('Service Error:', error.message);
        throw error;
    }
};

export const getRecentActivities = async (count = 10) => {
    try {
        const { ok, data } = await apiRequest(`Dashboard/recent-activities?count=${count}`);
        if (!ok) {
            throw new Error('Failed to fetch recent activities');
        }
        return { success: true, data };
    } catch (error) {
        console.error('Service Error:', error.message);
        throw error;
    }
};