<template>
    <!-- list charts -->
    <!-- allign center -->
    <div class="container" >
        <h1>Charts</h1>
        <div class="row">
            <div class="col-sm">

            </div>
            <div class="col-md">
                <ul>
                    <li>
                        <router-link to="/barchart">Bar chart</router-link>
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
  