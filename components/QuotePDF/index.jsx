import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #999'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  section: {
    margin: 10,
    padding: 10
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 24
  },
  tableHeader: {
    backgroundColor: '#f0f0f0'
  },
  tableCell: {
    flex: 1,
    padding: 5
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666'
  }
});

const QuotePDF = ({ data }) => {
  const { package: selectedPackage, billingType, selectedServices, total } = data;
  const currentDate = new Date().toLocaleDateString('zh-CN');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AI孵化服务报价单</Text>
          <Text style={styles.subtitle}>日期: {currentDate}</Text>
          <Text style={styles.subtitle}>报价编号: QT{Date.now()}</Text>
        </View>

        <View style={styles.section}>
          <Text>服务包类型: {selectedPackage.name}</Text>
          <Text>计费方式: {
            billingType === 'project' ? '项目制' :
            billingType === 'yearly' ? '年度服务' : '股权合作'
          }</Text>
        </View>

        <View style={styles.section}>
          <Text>已选服务项目:</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>服务项目</Text>
              <Text style={styles.tableCell}>价格范围</Text>
            </View>
            {Object.entries(selectedServices).map(([service, items]) => (
              items.map(item => (
                <View style={styles.tableRow} key={item}>
                  <Text style={styles.tableCell}>{item}</Text>
                  <Text style={styles.tableCell}>
                    {formatPrice(selectedPackage.services[service].items.find(i => i.name === item).price)}
                  </Text>
                </View>
              ))
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.total}>
            预估总价: {formatPrice(total.total || total.min)} 
            {total.max ? ` - ${formatPrice(total.max)}` : ''}
          </Text>
          {billingType === 'equity' && (
            <Text>可转换股权比例: {selectedPackage.equity.min * 100}% - {selectedPackage.equity.max * 100}%</Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text>注: 本报价单有效期为15天</Text>
          <Text>联系电话: XXX-XXXX-XXXX</Text>
          <Text>邮箱: contact@example.com</Text>
        </View>
      </Page>
    </Document>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(price);
};

export default QuotePDF;
