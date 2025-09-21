import React from 'react';
import sampleData from '../../data/sampleData';
import StatCard from '../../components/StatCard';
import Navigation from '../../components/Navigation';
import { Eye, Heart, Instagram, MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react';

const AnalyticsDashboardPage = () => {
  const analytics = sampleData.analytics;
  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your business performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Weekly Sales" value={`₹${analytics.weeklySales.toLocaleString()}`} icon={<TrendingUp className="h-6 w-6 text-primary" />} trend="12%" />
            <StatCard title="Total Views" value={analytics.totalViews.toLocaleString()} icon={<Eye className="h-6 w-6 text-blue-500" />} trend="8%" color="blue-500" />
            <StatCard title="Products Liked" value={analytics.productsLiked.toString()} icon={<ThumbsUp className="h-6 w-6 text-green-500" />} trend="15%" color="green-500" />
            <StatCard title="Instagram Reach" value={`${analytics.instagramLikes + analytics.instagramComments}`} icon={<Instagram className="h-6 w-6 text-pink-500" />} trend="5%" color="pink-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card-warm p-6">
              <h3 className="text-xl font-serif font-bold mb-6">Weekly Sales Trend</h3>
              <div className="space-y-4">
                {analytics.chartData.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{day.day}</span>
                    <div className="flex items-center space-x-2 flex-1 mx-4">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${(day.sales / 2000) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-bold">₹{day.sales}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-warm p-6">
              <h3 className="text-xl font-serif font-bold mb-6">Instagram Performance</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Likes</span>
                  </div>
                  <span className="text-2xl font-bold">{analytics.instagramLikes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <span>Comments</span>
                  </div>
                  <span className="text-2xl font-bold">{analytics.instagramComments}</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Your Instagram posts are performing well! Keep sharing your beautiful creations.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-warm p-6">
            <h3 className="text-xl font-serif font-bold mb-4">Business Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">What's Working Well</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Your terracotta bowls are very popular</li>
                  <li>• Thursday and Friday are your best sales days</li>
                  <li>• Instagram engagement is growing steadily</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-blue-600">Opportunities</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Consider creating more ceramic pieces</li>
                  <li>• Weekend sales could be improved</li>
                  <li>• Video content might boost engagement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation userRole="artisan" />
    </div>
  );
};

export default AnalyticsDashboardPage;


