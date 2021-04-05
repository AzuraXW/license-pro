<template>
  <div class="answers-deatils">
    <p class="question">{{ curQusInfo.question }}</p>
    <van-image
      v-if="curQusInfo.url"
      width="3.4rem"
      height="3.4rem"
      fit="cover"
      :src="curQusInfo.url"
    />
    <div class="options">
      <answer-btn
        :correct="curQusInfo.answer === item.id.toString()"
        :error="!curQusInfo.accuracy ? item.id === curQusInfo.userAnswer ? true : false : ''"
        v-for="(item) in options"
        :key="item.id"
      >
        {{item.text}}
      </answer-btn>
    </div>
    <div class="explain">
      <p v-if="!curQusInfo.accuracy">
        解析：
        {{ curQusInfo.explains }}
      </p>
    </div>
    <van-button type="primary" block @click="switchDetail('next')">查看下一题</van-button>
  </div>
</template>

<script>
import { setAnswerOptions } from '@/utils/answer.js'
import answerBtn from '@/components/answerBtn'
import { computed, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'

const curAnswerInfo = reactive({
  options: [],
  curQusInfo: {}
})
const updateData = (data, index) => {
  curAnswerInfo.curQusInfo = data[index]
  curAnswerInfo.options = setAnswerOptions(curAnswerInfo.curQusInfo)
}
export default {
  setup () {
    const store = useStore()
    const userSelectDetails = computed(() => (store.state.userSelectDetails))
    const position = ref(0)
    updateData(userSelectDetails.value, position.value)

    const switchDetail = (action) => {
      if (typeof action === 'number') {
        position.value = action
      } else {
        if (action === 'next') {
          if (position.value < userSelectDetails.value.length) {
            position.value++
          } else {
            Toast('已经是最后一题了')
          }
        } else if (action === 'prev') {
          if (position.value > 0) {
            position.value--
          }
        }
      }
      updateData(userSelectDetails.value, position.value)
    }

    return {
      ...toRefs(curAnswerInfo),
      switchDetail
    }
  },
  components: {
    answerBtn
  }
}
</script>

<style lang="scss" scoped>
.answers-deatils{
  .question{
    font-size: 18px;
  }
  .van-image{
    left: 50%;
    margin-bottom: 25px;
    transform: translateX(-50%);
  }
  .explain{
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
