<template>
  <div class="index">
    <subject-selector></subject-selector>
    <model-type-selector></model-type-selector>
    <button class="btn-none answer-btn" @click="handleAnswerStart">开始答题</button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import SubjectSelector from '@/components/SubjectSelector/Index.vue'
import ModelTypeSelector from '@/components/ModelTypeSelector/Index.vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    // 开始答题，获取题目
    async function handleAnswerStart () {
      let data = localStorage.getItem('data')
      /* if (!data) {
        const res = await ctx.$http.getSubject({
          subject: store.state.subjectId,
          model: store.state.modelType
        })
        if (res.error_code === 0) {
          data = res.result
          localStorage.setItem('data', JSON.stringify(data))
        }
      } */
      const res = await ctx.$http.getSubject({
        subject: store.state.subjectId,
        model: store.state.modelType
      })
      if (res.error_code === 0) {
        data = res.result
        localStorage.setItem('data', JSON.stringify(data))
      }
      // store.commit('setData', JSON.parse(data))
      store.commit('setData', data)
      console.log(store.state.data)
      if (store.state.data.length > 0) {
        router.push({ name: 'Test' })
      }
    }

    return {
      handleAnswerStart
    }
  },
  components: {
    SubjectSelector,
    ModelTypeSelector
  }
}
</script>

<style lang="scss" scoped>
.answer-btn{
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  background-color: #0066CC;
  width: 100%;
  height: 40px;
  &:active{
    box-shadow: inset 0px 0px 15px 5px #ccc;
  }
}
</style>
