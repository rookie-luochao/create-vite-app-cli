<script setup lang="ts">
import { IUserInfo, useUserInfoStore } from "../core/store/user";
import { useQuery } from "@tanstack/vue-query";
import { HelloGet } from "../api/hello";
import { toRef } from "vue";

const userInfoStore = useUserInfoStore();
const name = toRef(userInfoStore?.userInfo || ({} as IUserInfo), "name");

const { data, isPending, refetch } = useQuery({
  queryKey: ["helloGet", name],
  queryFn: () => HelloGet({ name: name.value || "" }),
});
</script>

<template>
  <div>this is mainlayout page</div>
  <el-button :isLoading="isPending" @click="refetch">刷新请求</el-button>
  <div>{{ data?.data }}</div>
  <router-view />
</template>
