<template>
  <myHeader>{{ headerTitle }}</myHeader>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import myHeader from './components/myHeader'
import { computed, watch } from 'vue'
export default {
  components: {
    myHeader
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    watch(() => {
      return router.currentRoute.value.name
    }, (value) => {
      store.commit('setHeaderTitle', value)
    })
    return {
      headerTitle: computed(() => (store.state.headerTitle))
    }
  }
}
</script>

<style lang="scss">
  .container{
    margin: 40px 20px 0 20px;
    padding-top: 20px;
  }
</style>
