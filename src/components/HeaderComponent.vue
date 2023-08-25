<template>
  <div class="header">
    <h1 class="header-title">{{title}}</h1>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            required: true,
            type: String 
        }
    }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .header {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
    
        .header-title {
            margin:auto;
        }
    }
</style>
