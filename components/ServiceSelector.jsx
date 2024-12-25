import React, { useState } from 'react';

export const ServiceSelector = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const serviceCategories = [
        {
            title: '技术服务',
            icon: 'code',
            items: [
                { 
                    id: 'mvp', 
                    name: 'MVP打造指导', 
                    price: 10000, 
                    unit: '次',
                    description: '产品定位与技术选型建议',
                    duration: '4小时'
                },
                { 
                    id: 'arch', 
                    name: '技术架构咨询', 
                    price: 15000, 
                    unit: '次',
                    description: '系统设计与扩展性规划',
                    duration: '6小时'
                },
                {
                    id: 'tech_team',
                    name: '技术团队搭建规划',
                    price: 15000,
                    unit: '次',
                    description: '团队结构与人才配置建议',
                    duration: '4小时'
                }
            ]
        },
        {
            title: '咨询服务',
            icon: 'chart',
            items: [
                {
                    id: 'bp',
                    name: '商业计划书优化',
                    price: 15000,
                    unit: '次',
                    description: '商业模式与财务预测分析',
                    duration: '8小时'
                },
                {
                    id: 'market',
                    name: '市场调研',
                    price: 10000,
                    unit: '次',
                    description: '竞品分析与市场定位',
                    duration: '5小时'
                },
                {
                    id: 'strategy',
                    name: '战略规划',
                    price: 25000,
                    unit: '次',
                    description: '发展路径与目标设定',
                    duration: '10小时'
                }
            ]
        },
        {
            title: '财务服务',
            icon: 'calculator',
            items: [
                {
                    id: 'finance_analysis',
                    name: '财务运营分析',
                    price: 20000,
                    unit: '次',
                    description: '现金流与成本控制分析',
                    duration: '8小时'
                },
                {
                    id: 'finance_advisory',
                    name: '财务顾问服务',
                    price: 5000,
                    unit: '小时',
                    description: '专业财务咨询支持',
                    minHours: 2
                }
            ]
        },
        {
            title: '法务服务',
            icon: 'scale',
            items: [
                {
                    id: 'contract',
                    name: '定制化合同',
                    price: 8000,
                    unit: '份',
                    description: '商业合同审核与定制',
                    duration: '3天'
                },
                {
                    id: 'compliance',
                    name: '合规咨询',
                    price: 12000,
                    unit: '次',
                    description: '法律风险评估',
                    duration: '6小时'
                }
            ]
        }
    ];

    const handleServiceSelect = (service) => {
        const isSelected = selectedServices.find(s => s.id === service.id);
        if (isSelected) {
            setSelectedServices(selectedServices.filter(s => s.id !== service.id));
            setTotalPrice(totalPrice - service.price);
        } else {
            setSelectedServices([...selectedServices, service]);
            setTotalPrice(totalPrice + service.price);
        }
    };

    const CategoryIcon = ({ type }) => {
        const icons = {
            code: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
            ),
            chart: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
            ),
            calculator: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
            ),
            scale: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
            )
        };

        return (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                            ${type === 'code' ? 'bg-blue-100 text-blue-600' :
                              type === 'chart' ? 'bg-green-100 text-green-600' :
                              type === 'calculator' ? 'bg-purple-100 text-purple-600' :
                              'bg-indigo-100 text-indigo-600'}`}>
                {icons[type]}
            </div>
        );
    };

    const ServiceDetailModal = ({ service, isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                        <p className="text-gray-500 mt-2">{service.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500">服务价格</div>
                            <div className="text-xl font-bold text-blue-600 mt-1">
                                ¥{service.price.toLocaleString()} / {service.unit}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500">服务时长</div>
                            <div className="text-xl font-bold text-gray-900 mt-1">
                                {service.duration || `最少${service.minHours}小时`}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">服务内容</h4>
                        <ul className="space-y-2">
                            {service.details?.map((detail, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-600">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const ServiceCard = ({ service, isSelected, onSelect }) => {
        return (
            <div className="relative group">
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 
                    ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => {
                                setSelectedService(service);
                                setIsModalOpen(true);
                            }} className="p-2 text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>
                            <button onClick={() => onSelect(service)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 
                                        ${isSelected 
                                            ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {isSelected ? '已选择' : '选择'}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-blue-600 font-semibold">
                            ¥{service.price.toLocaleString()} / {service.unit}
                        </div>
                        <div className="text-gray-500">
                            {service.duration || `最少${service.minHours}小时`}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 服务列表 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCategories.map(category => (
                    <div key={category.title} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <CategoryIcon type={category.icon} />
                            <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {category.items.map(service => (
                                <ServiceCard 
                                    key={service.id} 
                                    service={service} 
                                    isSelected={selectedServices.find(s => s.id === service.id)} 
                                    onSelect={handleServiceSelect} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 服务详情弹窗 */}
            <ServiceDetailModal 
                service={selectedService} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            {/* 购物车浮动栏 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">已选择 {selectedServices.length} 项服务</span>
                        <span className="text-2xl font-bold text-blue-600">¥{totalPrice}</span>
                    </div>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                                     transition-colors duration-200 flex items-center space-x-2">
                        <span>立即购买</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
