import React, { useState } from 'react';
import {
  Settings,
  Lock,
  User,
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Key,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { apiClient } from '../../services/apiClient';

export const AdminSettings: React.FC = () => {
  const { user } = useAuth();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Seed state
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await authService.updatePassword({ currentPassword, newPassword });
      if (res.success) {
        setPasswordSuccess('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(res.error || 'Failed to update password');
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Error updating password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRunSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const { data, error } = await apiClient.request<any>('/api/admin/seed', { method: 'POST' });
      if (error) {
        setSeedResult(`Seeding failed: ${error}`);
      } else {
        setSeedResult(
          `Sync complete: ${data?.insertedCategories || 0} categories, ${data?.insertedProducts || 0} products verified.`
        );
      }
    } catch (err: any) {
      setSeedResult(`Error: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Settings className="w-7 h-7 text-slate-300" />
            Admin Settings &amp; Security
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your account credentials, security preferences, and database synchronization.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-brandGold" />
            Administrator Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Admin Name
              </span>
              <p className="font-bold text-white mt-1">{user?.name || 'Administrator'}</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Email Address
              </span>
              <p className="font-bold text-white mt-1">{user?.email || 'admin@pashupatisuppliers.com'}</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Role
              </span>
              <p className="font-bold text-brandGold mt-1 uppercase tracking-wider">
                {user?.role || 'Super Admin'}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-brandRed" />
            Change Password
          </h2>

          {passwordError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Current Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="px-5 py-2.5 bg-brandRed hover:bg-brandRed-dark text-white text-xs font-bold rounded-xl shadow-lg shadow-brandRed/20 transition-all disabled:opacity-50"
            >
              {passwordLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Database Sync Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            Database Seeding &amp; Synchronization
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            If you deployed to Cloudflare D1 fresh or need to ensure all 24 initial catalog products and 7 categories are present in the database, click the sync button below. Existing customized records will not be overwritten.
          </p>

          {seedResult && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-xs text-blue-300">
              {seedResult}
            </div>
          )}

          <button
            onClick={handleRunSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Syncing...' : 'Sync Catalog Data to D1'}</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
