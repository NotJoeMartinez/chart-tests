import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from '@/HomePage.vue'
import BarChart from '@/charts/BarChart.vue'

const routes = [{
    'path': '/',
        component: HomePage 
    },
    {
        'path': '/barChart',
        'name': 'BarChart',
        component: BarChart 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;