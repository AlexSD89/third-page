import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PriceEditor from './PriceEditor';
import AnalyticsReport from './AnalyticsReport';
import { storage } from '@/utils/storage';
import { ErrorHandler } from '@/utils/errorHandler';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('prices');
  const [prices, setPrices] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedPrices = storage.get('prices');
      const quoteHistory = storage.get('quoteHistory') || [];
      setPrices(savedPrices);
      
      // 生成分析数据
      const analysis = analyzeQuoteHistory(quoteHistory);
      setAnalytics(analysis);
    } catch (error) {
      ErrorHandler.handle(error, 'Loading admin data');
    }
  };

  const analyzeQuoteHistory = (history) => {
    if (!history.length) return null;

    const analysis = {
      totalQuotes: history.length,
      averagePrice: 0,
      popularServices: {},
      packageDistribution: {
        basic: 0,
        growth: 0,
        premium: 0
      },
      billingTypeDistribution: {
        project: 0,
        yearly: 0,
        equity: 0
      },
      monthlyTrends: {},
      serviceCategories: {
        consulting: 0,
        financial: 0,
        legal: 0,
        fa: 0
      }
    };

    let totalPrice = 0;

    history.forEach(quote => {
      // 计算平均价格
      const price = quote.total.total || quote.total.min;
      totalPrice += price;

      // 统计服务包选择
      analysis.packageDistribution[quote.package.type]++;

      // 统计计费方式
      analysis.billingTypeDistribution[quote.billingType]++;

      // 统计服务类别选择
      Object.keys(quote.selectedServices).forEach(category => {
        analysis.serviceCategories[category] += quote.selectedServices[category].length;
        
        // 统计具体服务项目
        quote.selectedServices[category].forEach(service => {
          analysis.popularServices[service] = (analysis.popularServices[service] || 0) + 1;
        });
      });

      // 按月统计趋势
      const month = new Date(quote.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
      analysis.monthlyTrends[month] = (analysis.monthlyTrends[month] || 0) + 1;
    });

    analysis.averagePrice = totalPrice / history.length;

    // 排序最受欢迎的服务
    analysis.popularServices = Object.entries(analysis.popularServices)
      .sort(([,a], [,b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return analysis;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>管理后台</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="prices">价格管理</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>

          <TabsContent value="prices">
            <PriceEditor prices={prices} onPricesChange={setPrices} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsReport data={analytics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;