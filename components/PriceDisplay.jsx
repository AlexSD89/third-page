import React from 'react';

export const PriceDisplay = ({ selectedServices, totalPrice, onRemove }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">订单明细</h3>
                <span className="text-sm text-gray-500">
                    已选 {selectedServices.length} 项
                </span>
            </div>

            {selectedServices.length > 0 ? (
                <div className="space-y-4">
                    {selectedServices.map(service => (
                        <div key={service.id} 
                             className="flex justify-between items-center py-3 border-b border-gray-100
                                      hover:bg-gray-50 transition-colors duration-200 -mx-4 px-4">
                            <div className="pr-4">
                                <h4 className="font-medium text-gray-900">{service.name}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-sm text-gray-500">
                                        ¥{service.price.toLocaleString()} / {service.unit}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {service.duration}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => onRemove(service.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors duration-200
                                             p-2 hover:bg-red-50 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">总计</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ¥{totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                                         transition-colors duration-200 flex items-center justify-center space-x-2">
                            <span>提交订单</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <p>暂未选择任何服务</p>
                </div>
            )}
        </div>
    );
};
