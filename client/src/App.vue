<template>
  <div class="container">
    <img src="./assets/logo.png" class="logo" alt="Vue" />
    <p class="title">Slice Upload Demo</p>
    <p class="subtitle">Large file slice upload demo, develop by Vue + Koa.</p>
    <div class="upload">
      <upload />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Upload from './components/Upload/index.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    width: 200px;
    margin: 80px 0 10px;
  }

  .title {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 500;
  }

  .subtitle {
    margin-bottom: 38px;
    font-size: 18px;
    color: #b1b1b1;
  }
}
</style>
