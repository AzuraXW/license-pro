<template>
  <button
    class="btn-none modeltype-btn"
    :class="{
      'selected': modelType.id === curModelType
    }"
    @click="handleClick"
  >
  {{ modelType.text }}
  </button>
</template>

<script>
export default {
  props: ['modelType', 'curModelType'],
  setup (props, ctx) {
    const handleClick = () => {
      ctx.emit('switch', props.modelType.id)
    }

    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.modeltype-btn{
  width: 150px;
  height: 45px;
  border-radius: 5px;
  font-size: 14px;
  transition: all .2s;
  border: 2px solid #0099FF;
  margin-bottom: 20px;
  &.selected{
    color: #fff;
    background-color: #00FF99;
    border: 2px solid #00FF99;
    box-shadow: 0 0 5px 3px rgb(235, 235, 235);
  }
}
</style>
