export class FormatHelper {
  static formatAsPercentage = (value: number): string => {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  };
}
