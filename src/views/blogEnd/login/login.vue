<template>
    <div>
      <BackGround></BackGround>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Api from '@/api/index.js'
import BackGround from './components/background.vue'
export default defineComponent({
  components:{
    BackGround
  },
  setup() {
      console.log(Api.login)
  },
})
</script>


<style lang="scss">

</style>
