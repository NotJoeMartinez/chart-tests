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
        component: SampleBarChart 
    },
    {
        'path': '/barChartData',
        'name': 'BarChartData',
        component: BarChartData 
    },
    {
        'path': '/stackedBarChart',
        'name': 'stackedBarChart',
        component: StackedBarChart 
    },
    {
        'path': '/openingsChart',
        'name': 'openingsChart',
        component: OpeningsChart 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;