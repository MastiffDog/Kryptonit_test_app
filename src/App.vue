<template>
<div class="app">
  <header-component :title='title'/>

  <table-data/>
</div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import TableData from './components/TableData.vue';

// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default defineComponent({
  components:{
    HeaderComponent,
    TableData
  },

  setup () {
    const title = ref<string>("Табличное представление данных");

    return {
      title
    }
  }

})
</script>

<style>
  .app {
    display: flex;
    flex-direction: column;
  }
</style>
