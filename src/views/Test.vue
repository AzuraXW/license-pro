<template>
  <div class="question-wrapper">
    <p class="question">{{ curQus.question }}</p>
    <van-image
      v-if="curQus.url"
      width="3.4rem"
      height="3.4rem"
      fit="cover"
      :src="curQus.url"
    />
    <div class="answer-options">
      <answer-btn
        :correct="userSelectAnswerId === item.id"
        v-for="(item) in curQusAnswers"
        :key="item.id"
        @click="userSelectAnswer(item.id)"
      >
        {{item.text}}
      </answer-btn>
    </div>
    <div class="qus-control">
      <van-button size="small" type="primary" @click="swtichQus('prev')">上一题</van-button>
      <van-button size="small" type="primary" @click="swtichQus('next')">下一题</van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import answerBtn from '@/components/answerBtn'
import { setAnswerOptions } from '@/utils/answer.js'

const confirmSubmit = (router) => {
  Dialog.confirm({
    message: '确认提交吗'
  }).then(() => {
    router.push({ name: 'Result' })
  })
}

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    if (!store.state.data.length) {
      router.push({ name: 'Index' })
    }

    const question = reactive({
      allQuetions: [],
      curQus: {},
      curQusAnswers: []
    })
    const curQusInfo = reactive({
      id: '',
      pos: 0
    })

    question.allQuetions = computed(() => { return store.state.data.slice(0, 5) })
    const updateQusInfo = () => {
      question.curQus = question.allQuetions[curQusInfo.pos]
      question.curQusAnswers = setAnswerOptions(question.curQus)
      curQusInfo.id = question.curQus.id
    }
    updateQusInfo()

    const userSelectAnswerId = ref('')
    const userSelects = reactive(computed(() => (store.state.userSelects)))
    // 切换题目
    const swtichQus = (action) => {
      if (action === 'next') {
        if (curQusInfo.pos < question.allQuetions.length - 1) {
          curQusInfo.pos += 1
        } else {
          confirmSubmit(router)
        }
      } else if (action === 'prev') {
        curQusInfo.pos > 0 && (curQusInfo.pos -= 1)
      }
      updateQusInfo()
      console.log(userSelects)
      if (userSelects.value[curQusInfo.id]) {
        userSelectAnswerId.value = userSelects.value[curQusInfo.id]
      } else {
        userSelectAnswerId.value = ''
      }
    }

    // 用户选择答案相关逻辑
    const userSelectAnswer = (id) => {
      userSelectAnswerId.value = id
      // 保存当前答案
      store.commit('setUserAnswer', {
        id: curQusInfo.id.toString(),
        answerId: userSelectAnswerId.value
      })
    }

    return {
      ...toRefs(question),
      ...toRefs(curQusInfo),
      swtichQus,
      userSelectAnswerId,
      userSelectAnswer
    }
  },
  components: {
    answerBtn
  }
}
</script>

<style lang="scss" scoped>
.question-wrapper{
  .van-image{
    left: 50%;
    margin-bottom: 25px;
    transform: translateX(-50%);
  }
  .question{
    font-size: 18px;
    margin-bottom: 20px;
  }
  .qimg{
    display: flex;
    justify-content: center;
    img{
      width: 130px;
      margin: auto;
    }
  }
  .answer-options{
    .option-btn{
      border-radius: 50px;
      width: 100%;
      height: 45px;
      display: block;
      margin-bottom: 25px;
      border: 1px solid #ccc;
      font-size: 14px;
      transition: all .2s;
      &.selected{
        color: #fff;
        border-color: transparent;
        background-image: linear-gradient(to right, RGB(225,17,53), RGB(237,160,109));
      }
    }
  }
  .qus-control{
    display: flex;
    justify-content: space-between;
    .control{
      width: 100px;
      height: 35px;
      border-radius: 5px;
      background-color: #0099CC;
      color: #fff;
    }
  }
}
</style>
