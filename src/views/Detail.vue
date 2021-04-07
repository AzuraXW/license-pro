<template>
  <div class="answers-deatils">
    <div class="orders">
      <ul>
        <li
        v-for="(unwant, index) in userSelectDetails"
        :key="unwant.id"
        :class="{
          'cur': position === index
        }"
        @click="switchDetail(index)"
        >
          {{index+1}}
        </li>
      </ul>
    </div>
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
      <p v-if="!curQusInfo.accuracy" v-html="'解析：' + curQusInfo.explains">
      </p>
      <p v-else>
        恭喜你答对了！
      </p>
    </div>
    <van-button type="primary" block @click="switchDetail('next')">查看下一题</van-button>
  </div>
</template>

<script>
import { setAnswerOptions } from '@/utils/answer.js'
import answerBtn from '@/components/answerBtn'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    if (!store.state.userSelectDetails.length) {
      router.push({ name: 'Index' })
    }

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
      switchDetail,
      userSelectDetails,
      position
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
    img{
      width: 80px;
    }
  }
  .orders{
    height: 30px;
    overflow: hidden;
    padding: 5px 0;
    ul{
      overflow: auto;
      display: flex;
      padding-bottom: 15px;
      li{
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        &:not(:last-child){
          margin-right: 50px;
        }
        &.cur{
          background-color: cornflowerblue;
          color: #fff;
        }
      }
    }
  }
}
</style>
