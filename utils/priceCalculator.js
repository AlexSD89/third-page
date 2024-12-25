export class PriceCalculator {
  constructor(prices) {
    this.prices = prices;
  }

  calculateServicePrice(packageType, service, item) {
    const serviceConfig = this.prices[packageType]?.services[service]?.items
      .find(i => i.name === item);
    
    if (!serviceConfig) return 0;

    if (serviceConfig.maxPrice) {
      return {
        min: serviceConfig.price,
        max: serviceConfig.maxPrice
      };
    }

    return {
      total: serviceConfig.price
    };
  }

  calculatePackageTotal(packageType, selectedServices) {
    let total = 0;
    let hasRange = false;
    let minTotal = 0;
    let maxTotal = 0;

    Object.entries(selectedServices).forEach(([service, items]) => {
      items.forEach(item => {
        const price = this.calculateServicePrice(packageType, service, item);
        if (price.min !== undefined) {
          hasRange = true;
          minTotal += price.min;
          maxTotal += price.max;
        } else {
          total += price.total;
        }
      });
    });

    return hasRange ? { min: minTotal, max: maxTotal } : { total };
  }

  calculateYearlyPrice(packageType) {
    const package_ = this.prices[packageType];
    return {
      min: package_.yearly.min,
      max: package_.yearly.max
    };
  }

  getEquityRange(packageType) {
    const package_ = this.prices[packageType];
    return package_.equity ? {
      min: package_.equity.min,
      max: package_.equity.max
    } : null;
  }
}