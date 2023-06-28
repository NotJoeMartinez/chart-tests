import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from '@/HomePage.vue'
import SampleBarChart from '@/charts/SampleBarChart.vue'
import BarChartData from '@/charts/BarChartData.vue'

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;