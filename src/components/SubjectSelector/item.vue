<template>
  <button
    class="btn-none subject-btn"
    :class="{
      'selected': subjectItem.id === curSubjectId
    }"
    @click="handleClick"
  >
  {{ subjectItem.text }}
  </button>
</template>

<script>
export default {
  props: ['subjectItem', 'curSubjectId'],
  setup (props, ctx) {
    const handleClick = () => {
      ctx.emit('switch', props.subjectItem.id)
    }

    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-btn{
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background-color: #00CCFF;
  font-size: 16px;
  color: #fff;
  transition: all .2s;
  &.selected{
    background-color: #00FF99;
    box-shadow: 0 0 5px 3px rgb(235, 235, 235);
  }
}
</style>
