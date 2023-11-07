<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { defaultUserInfo, useUserStore } from "../core/store/user";
import { ElMessage } from "element-plus";
import router from "../core/router";

const userStore = useUserStore();
const defaultAccountInfo = {
  username: "zhangshan",
  password: "123456",
};

const formData = ref({
  ...defaultAccountInfo,
});
const height = computed(() => {
  return globalThis.document.documentElement.clientHeight + "px";
}).value;
onMounted(() => {
  localStorage.clear();
});

const onSubmit = () => {
  const { username, password } = formData.value;
  if (username === defaultAccountInfo.username && password === defaultAccountInfo.password) {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    userStore.updateUserInfo(defaultUserInfo);
    router.push({ name: "Dashboard" });
  } else {
    console.log("error");
    ElMessage({
      message: "用户名或者密码不对，请检查！",
      type: "warning",
    });
  }
};
</script>

<template>
  <div class="wrap">
    <el-form label-position="top" label-width="100px" :model="formData" style="width: 420px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" aria-placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" aria-placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.wrap {
  height: v-bind("height");
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
