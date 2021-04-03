<template>
  <div>
    Index Page
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
export default {
  setup () {
    const { ctx } = getCurrentInstance()
    onMounted(async () => {
      const res = await ctx.$http.getSubject({
        subject: 1,
        model: 'c1'
      })
      console.log(res)
    })
  }
}
</script>

<style>

</style>
