<template>
  <header class="page-header"><slot></slot></header>
</template>

<script>
</script>

<style scoped lang="scss">
.page-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #3399FF;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  z-index: 999;
}
</style>
