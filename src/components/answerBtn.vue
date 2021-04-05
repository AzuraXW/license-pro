<template>
  <button
    class="btn-none answer-btn"
    :class="{
      correct: correct,
      error: error
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['correct', 'error']
}
</script>

<style lang="scss" scoped>
.answer-btn{
  border-radius: 50px;
  width: 100%;
  height: 45px;
  display: block;
  margin-bottom: 25px;
  border: 1px solid #ccc;
  font-size: 14px;
  position: relative;
  &::after{
    font-family: 'vant-icon';
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  &.correct::after{
    content: '\F0C8';
  }
  &.error::after{
    content: '\F042';
  }
  &.correct, &.error{
    color: #fff;
    border-color: transparent;
    background-image: linear-gradient(to right, RGB(225,17,53), RGB(237,160,109));
  }
}
</style>
