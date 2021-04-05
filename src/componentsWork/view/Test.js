import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
console.log(store)
const questions = computed(() => (store.state.data))
console.log(questions)
const qusPosition = ref(0)
let curQus = reactive(questions[qusPosition.value])
console.log(questions[qusPosition.value])

// 切换题目
const swtichQus = (action) => {
  if (action === 'next') {
    qusPosition.value < questions.value.length && (qusPosition.value += 1)
  } else if (action === 'prev') {
    qusPosition.value > 0 && (qusPosition.value -= 1)
  }
  curQus = questions[qusPosition]
}

export {
  curQus,
  swtichQus
}
