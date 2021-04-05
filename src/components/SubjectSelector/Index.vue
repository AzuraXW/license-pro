<template>
  <div class="subject-selector-wrapper">
    <item
      v-for="subject in subjects"
      :key="subject.id"
      :subjectItem="subject"
      :curSubjectId="subjectId"
      @switch="switchSubjectId"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import subjects from '@/config/subjects.js'
import item from './item'
export default {
  setup () {
    const store = useStore()
    // 切换科目
    const switchSubjectId = (id) => {
      store.commit('setSubjectId', id)
    }
    return {
      subjectId: computed(() => (store.state.subjectId)),
      subjects,
      switchSubjectId
    }
  },
  components: {
    item
  }
}
</script>

<style lang="scss" scoped>
.subject-selector-wrapper{
  display: flex;
  justify-content: space-between;
}
</style>
