export const setAnswerOptions = (data) => {
  const result = []
  for (let i = 1; i <= 4; i++) {
    if (!data['item' + i]) {
      continue
    }
    result.push({
      id: i,
      text: data['item' + i]
    })
  }
  return result
}
