import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/settingsService';

const initialSettings = {
  defaultFinePerDay: '',
  maxFineLimit: '',
  defaultBorrowingDays: '',
  maxBooksPerMember: '',
  isLibraryOpen: true,
  defaultLanguage: 'en',
  timeZone: 'UTC',
};

export default function GlobalSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchSettings = async () => {
    setLoading(true);
    const result = await getSettings();
    if (result.success) {
      setSettings({
        defaultFinePerDay: result.data.defaultFinePerDay ?? '',
        maxFineLimit: result.data.maxFineLimit ?? '',
        defaultBorrowingDays: result.data.defaultBorrowingDays ?? '',
        maxBooksPerMember: result.data.maxBooksPerMember ?? '',
        isLibraryOpen: result.data.isLibraryOpen ?? true,
        defaultLanguage: result.data.defaultLanguage ?? 'en',
        timeZone: result.data.timeZone ?? 'UTC',
      });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to load settings' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    // Prepare data for API - only send fields that have values
    const payload = {};
    if (settings.defaultFinePerDay !== '') payload.defaultFinePerDay = parseFloat(settings.defaultFinePerDay);
    if (settings.maxFineLimit !== '') payload.maxFineLimit = parseFloat(settings.maxFineLimit);
    if (settings.defaultBorrowingDays !== '') payload.defaultBorrowingDays = parseInt(settings.defaultBorrowingDays);
    if (settings.maxBooksPerMember !== '') payload.maxBooksPerMember = parseInt(settings.maxBooksPerMember);
    if (settings.isLibraryOpen !== undefined) payload.isLibraryOpen = settings.isLibraryOpen;
    if (settings.defaultLanguage) payload.defaultLanguage = settings.defaultLanguage;
    if (settings.timeZone) payload.timeZone = settings.timeZone;
    payload.updatedBy = 'Current User'; // In real app, get from auth context

    const result = await updateSettings(payload);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      fetchSettings(); // Refresh to get updated values
    } else {
      setMessage({ type: 'error', text: result.errorMessage || 'Failed to update settings' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Global Settings</h1>
        <p className="text-gray-500 mt-1">Configure library-wide settings and policies</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Library Policies Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Library Policies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Fine Per Day ($)
              </label>
              <input
                type="number"
                name="defaultFinePerDay"
                value={settings.defaultFinePerDay}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0.50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Fine Limit ($)
              </label>
              <input
                type="number"
                name="maxFineLimit"
                value={settings.maxFineLimit}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="100.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Borrowing Period (Days)
              </label>
              <input
                type="number"
                name="defaultBorrowingDays"
                value={settings.defaultBorrowingDays}
                onChange={handleChange}
                min="1"
                max="365"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="14"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Books Per Member
              </label>
              <input
                type="number"
                name="maxBooksPerMember"
                value={settings.maxBooksPerMember}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="5"
              />
            </div>
          </div>
        </div>

        {/* Library Status Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Library Status</h2>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isLibraryOpen"
              checked={settings.isLibraryOpen}
              onChange={handleChange}
              className="h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
              id="isLibraryOpen"
            />
            <label htmlFor="isLibraryOpen" className="ml-3 text-sm font-medium text-gray-700">
              Library is Open for Borrowing
            </label>
          </div>
        </div>

        {/* Localization Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Localization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Language
              </label>
              <select
                name="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Zone
              </label>
              <select
                name="timeZone"
                value={settings.timeZone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Chicago">Central Time (US)</option>
                <option value="America/Denver">Mountain Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Dubai">Dubai</option>
                <option value="Asia/Riyadh">Riyadh</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
