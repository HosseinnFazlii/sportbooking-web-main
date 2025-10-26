import type { Props as appexChartProps } from 'react-apexcharts';
import dynamic from 'next/dynamic';
export type { ApexOptions } from 'apexcharts';

export const ReactApexcharts = dynamic<appexChartProps>(() => import('react-apexcharts'), { ssr: false });

export type { appexChartProps };