<template>
    <!-- list charts -->
    <!-- allign center -->
    <div class="container" >
        <h1>Charts</h1>
        <div class="row">
            <div class="col-sm">

            </div>
            <div class="col">
                <ul>
                    <li v-for="route in routes" :key="route.path">
                        <router-link :to="route.path"> {{ route.description }} </router-link>
                    </li>
                </ul>
            </div>
            <div class="col-sm">   
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'App',
    data() {
        return {
            routes: [
                { path: '/barchart', description: 'Sample Bar chart'},
                { path: '/barchartdata', description: 'Bar chart with user data'},
                { path: '/stackedbarchart', description: 'Stacked bar chart with random data'},
                { path: '/openingsChart', description: 'Reconstruction of free chess insights top openings graph'}
            ]
        }
    },
    mounted() {
        console.log(this.routes)
    }

}
</script>
  
<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
margin-top: 60px;
}

h1 {
    text-align: center;
    margin-bottom: 50px;
}
</style>
  