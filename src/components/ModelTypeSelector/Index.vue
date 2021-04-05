<template>
  <div class="modeltype-wrapper">
    <item
      v-for="modelType in modelTypes"
      :key="modelType.id"
      :modelType="modelType"
      :curModelType="curModelType"
      @switch="switchModelType"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import modelTypes from '@/config/modeltype.js'
import item from './item'
export default {
  setup () {
    const store = useStore()
    // 切换科目
    const switchModelType = (id) => {
      store.commit('setModelType', id)
    }
    return {
      curModelType: computed(() => (store.state.modelType)),
      modelTypes,
      switchModelType
    }
  },
  components: {
    item
  }
}
</script>

<style lang="scss" scoped>
.modeltype-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
}
</style>
