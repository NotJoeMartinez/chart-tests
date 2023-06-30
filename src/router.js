import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from '@/HomePage.vue'
import SampleBarChart from '@/charts/SampleBarChart.vue'
import BarChartData from '@/charts/BarChartData.vue'
import StackedBarChart from '@/charts/StackedBarChart.vue'
import OpeningsChart from '@/charts/OpeningChart.vue'

const routes = [{
    'path': '/',
        component: HomePage 
    },
    {
        'path': '/barChart',
        'name': 'BarChart',
        'description': 'Sample Bar chart',
        component: SampleBarChart 
    },
    {
        'path': '/barChartData',
        'name': 'BarChartData',
        'description': 'Bar chart with user data',
        component: BarChartData 
    },
    {
        'path': '/stackedBarChart',
        'name': 'stackedBarChart',
        'description': 'Stacked bar chart with random data',
        component: StackedBarChart 
    },
    {
        'path': '/openingsChart',
        'name': 'openingsChart',
        'description': 'Reconstruction of free chess insights top openings graph',
        component: OpeningsChart 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;