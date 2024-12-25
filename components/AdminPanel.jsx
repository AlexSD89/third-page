import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  const [prices, setPrices] = useState({
    basic: {
      consulting: {
        bp: { min: 8000, max: 15000 },
        marketResearch: { base: 12000 }
      },
      financial: {
        model: { base: 15000 },
        budget: { base: 8000 }
      },
      legal: {
        contract: { min: 5000, max: 8000 }
      },
      fa: {
        basic: { base: 10000 },
        matching: { base: 15000 }
      },
      yearly: { min: 100000, max: 150000 }
    },
    growth: {
      consulting: {
        strategy: { min: 30000, max: 50000 },
        market: { base: 25000 }
      },
      financial: {
        analysis: { base: 30000 },
        dueDiligence: { min: 40000, max: 100000 }
      },
      legal: {
        ip: { base: 30000 },
        compliance: { base: 25000 }
      },
      fa: {
        commission: { min: 0.02, max: 0.04 },
        roadshow: { base: 30000 }
      },
      yearly: { min: 250000, max: 500000 }
    },
    premium: {
      consulting: {
        strategy: { base: 100000 },
        project: { base: 80000 }
      },
      financial: {
        planning: { base: 80000 },
        financing: { base: 100000 }
      },
      legal: {
        fullService: { base: 80000 },
        ma: { base: 150000 }
      },
      fa: {
        fullService: { base: 200000 },
        resources: { base: 100000 }
      },
      yearly: { min: 300000, max: 1000000 },
      equity: { min: 0.02, max: 0.05 }
    }
  });

  const handlePriceChange = (package_, service, item, type, value) => {
    setPrices(prev => ({
      ...prev,
      [package_]: {
        ...prev[package_],
        [service]: {
          ...prev[package_][service],
          [item]: {
            ...prev[package_][service][item],
            [type]: Number(value)
          }
        }
      }
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>价格管理后台</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">基础成长包</TabsTrigger>
            <TabsTrigger value="growth">成长加速包</TabsTrigger>
            <TabsTrigger value="premium">全方位孵化包</TabsTrigger>
          </TabsList>

          {Object.entries(prices).map(([packageKey, packageData]) => (
            <TabsContent key={packageKey} value={packageKey}>
              <div className="space-y-6">
                {Object.entries(packageData).map(([serviceKey, serviceData]) => (
                  <div key={serviceKey} className="space-y-4">
                    <h3 className="font-semibold capitalize">{serviceKey}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(serviceData).map(([itemKey, itemData]) => (
                        <div key={itemKey} className="space-y-2">
                          <label className="text-sm">{itemKey}</label>
                          {Object.entries(itemData).map(([type, value]) => (
                            <Input
                              key={type}
                              type="number"
                              value={value}
                              onChange={(e) => handlePriceChange(
                                packageKey,
                                serviceKey,
                                itemKey,
                                type,
                                e.target.value
                              )}
                              className="w-full"
                              placeholder={`${type} price`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Button className="mt-6 w-full">保存价格设置</Button>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;