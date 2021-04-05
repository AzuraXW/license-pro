<template>
  <div class="result">
    <van-row justify="center">
      <van-col span="16"><p class="score"><span>{{score}}</span> / <span>100</span></p></van-col>
    </van-row>
    <div class="answer-detail">
      <ul class="detail-list">
        <li
          v-for="(item, index) in userSelects"
          :key="item.id"
        >
          <van-icon name="success" size="18" color="#66FF66" v-if="item.accuracy"/>
          <van-icon name="cross" size="18" color="#990033" v-else/>
          <span>{{index + 1}}</span>
        </li>
      </ul>
      <van-button type="primary" block :to="{ name: 'Detail' }">查看详情</van-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

const getAnswerDetails = (store) => {
  store.commit('setSelectDetails')
  const userSelectDetails = computed(() => (store.state.userSelectDetails))
  return userSelectDetails.value
}
const calScore = (data) => {
  const signalQusScore = 100 / data.length
  let score = 0
  data.forEach((item) => {
    if (item.accuracy) {
      score += signalQusScore
    }
  })
  return score
}
export default {
  setup () {
    const sotre = useStore()
    const userSelects = getAnswerDetails(sotre)
    const score = calScore(userSelects)
    return {
      score,
      userSelects
    }
  }
}
</script>

<style lang="scss" scoped>
.result{
  .score{
    text-align: center;
    font-size: 28px;
    span{
      color: peru;
    }
    span:first-child{
      color: orchid;
    }
  }
  .answer-detail{
    .detail-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width: 19%;
        text-align: center;
        span{
          display: block;
          line-height: 30px;
          text-align: center;
          margin: 8px auto 35px auto;
          font-size: 20px;
        }
      }
    }
  }
}

</style>
