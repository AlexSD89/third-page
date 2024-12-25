import { toast } from '@/components/ui/use-toast';

export class ErrorHandler {
  static handle(error, context = '') {
    console.error(`Error in ${context}:`, error);

    // 显示错误提示
    toast({
      title: "发生错误",
      description: this.getErrorMessage(error),
      variant: "destructive",
    });
  }

  static getErrorMessage(error) {
    if (typeof error === 'string') return error;
    
    // 处理常见错误类型
    switch (error.name) {
      case 'ValidationError':
        return '输入数据验证失败，请检查输入';
      case 'NetworkError':
        return '网络连接失败，请检查网络';
      case 'AuthError':
        return '认证失败，请重新登录';
      default:
        return error.message || '未知错误';
    }
  }

  static validateInput(data, rules) {
    const errors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      if (rule.required && !data[field]) {
        errors[field] = `${field}是必填项`;
      }
      if (rule.min && data[field] < rule.min) {
        errors[field] = `${field}不能小于${rule.min}`;
      }
      if (rule.max && data[field] > rule.max) {
        errors[field] = `${field}不能大于${rule.max}`;
      }
    });

    return Object.keys(errors).length ? errors : null;
  }
}