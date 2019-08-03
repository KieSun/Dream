function bubbleSort(data) {
  if (!Array.isArray(data) || data.length < 2) return data
  for (let i = 0; i < data.length; ++i) {
    let flag = false
    for (let j = 0; j < data.length - 1 - i; ++j) {
      if (data[j] > data[j + 1]) {
        let a = data[j]
        data[j] = data[j + 1]
        data[j + 1] = a
        flag = true
      }
    }
    if (!flag) break
  }
  return data
}

console.log(bubbleSort([4, 5, 6, 3, 2, 1]))
