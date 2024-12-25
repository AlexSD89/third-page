import { useEffect } from 'react';
import { storage } from '@/utils/storage';
import { ErrorHandler } from '@/utils/errorHandler';
import { motion, AnimatePresence } from 'framer-motion';

// ... 其他导入

const PricingCalculator = () => {
  // ... 现有状态

  // 加载保存的数据
  useEffect(() => {
    try {
      const savedPrices = storage.get('prices');
      if (savedPrices) {
        setPrices(savedPrices);
      }
    } catch (error) {
      ErrorHandler.handle(error, 'Loading saved prices');
    }
  }, []);

  // 保存价格更改
  const handlePriceChange = (package_, service, item, type, value) => {
    try {
      const newPrices = {
        ...prices,
        [package_]: {
          ...prices[package_],
          [service]: {
            ...prices[package_][service],
            [item]: {
              ...prices[package_][service][item],
              [type]: Number(value)
            }
          }
        }
      };

      setPrices(newPrices);
      storage.set('prices', newPrices);
    } catch (error) {
      ErrorHandler.handle(error, 'Updating prices');
    }
  };

  // 生成报价单
  const handleGenerateQuote = async () => {
    try {
      // 验证输入
      const errors = ErrorHandler.validateInput(
        { selectedServices },
        { selectedServices: { required: true } }
      );

      if (errors) {
        throw new Error('请至少选择一项服务');
      }

      // 生成报价单
      const quoteData = {
        package: servicePackages[selectedPackage],
        billingType,
        selectedServices,
        total: calculateTotal()
      };

      // 保存报价历史
      const history = storage.get('quoteHistory') || [];
      history.push({
        ...quoteData,
        date: new Date().toISOString()
      });
      storage.set('quoteHistory', history);

      setShowQuote(true);
    } catch (error) {
      ErrorHandler.handle(error, 'Generating quote');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <motion.div
          layout
          transition={{ duration: 0.3 }}
        >
          <ServiceSelector
            packageType={selectedPackage}
            services={servicePackages[selectedPackage].services}
            selectedServices={selectedServices}
            onServiceSelect={handleServiceSelect}
          />
        </motion.div>

        <motion.div
          layout
          transition={{ duration: 0.3 }}
        >
          <PriceDisplay
            originalPrice={calculateTotal().total}
            discount={calculateDiscount()}
            finalPrice={calculateFinalPrice()}
            onGenerateQuote={handleGenerateQuote}
            discountCode={discountCode}
            onDiscountCodeChange={setDiscountCode}
            billingType={billingType}
          />
        </motion.div>

        {showQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="col-span-2"
          >
            <QuotePDF data={{
              package: servicePackages[selectedPackage],
              billingType,
              selectedServices,
              total: calculateTotal()
            }} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PricingCalculator;