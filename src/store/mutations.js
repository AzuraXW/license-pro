export default {
  setSubjectId (state, payload) {
    state.subjectId = payload
  },
  setModelType (state, payload) {
    state.modelType = payload
  },
  setData (state, payload) {
    state.data = payload
  },
  setUserAnswer (state, payload) {
    state.userSelects[payload.id] = payload.answerId
  },
  setSelectDetails (state) {
    const { data: allQueations, userSelects } = state
    state.userSelectDetails = allQueations.map((qus, index) => {
      if (userSelects[qus.id]) {
        return {
          ...qus,
          userAnswer: userSelects[qus.id],
          accuracy: userSelects[qus.id] === parseInt(qus.answer)
        }
      }
    }).filter((item) => {
      return !!item
    })
  },
  setHeaderTitle (state, payload) {
    if (payload === 'Index') {
      state.headerTitle = '驾照题库'
    } else if (payload === 'Test') {
      state.headerTitle = '正在答题'
    } else if (payload === 'Result') {
      state.headerTitle = '答题结果'
    } else if (payload === 'Detail') {
      state.headerTitle = '详情解析'
    }
  }
}
