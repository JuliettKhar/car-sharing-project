<template>
  <div id="app">
    <el-container class="app__container">
      <el-aside>
        aside
      </el-aside>

      <el-container>
        <el-main>
          <transition name="fade">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
  @import 'src/assets/scss/index.scss';
</style>
