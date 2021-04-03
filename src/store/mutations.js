export default {
  setTestType (state, payload) {
    const { subjectId, modelType } = payload
    state.subjectId = subjectId
    state.modelType = modelType
  },
  setData (state, payload) {
    state.data = payload
  }
}
