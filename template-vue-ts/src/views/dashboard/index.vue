<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { HelloPost } from "../../api/hello";
import { useUserStore } from "../../core/store/user";

const queryClient = useQueryClient();
const userStore = useUserStore();

const { mutate, isPending } = useMutation({
  mutationFn: HelloPost,
  onSuccess: (res) => {
    // 第一种刷新方式：修改store
    userStore.updateUserInfo({ name: res.data?.split(" ")?.[1], accessToken: "456789" });
    // 第二种刷新方式：通过清除vue-query缓存key
    queryClient.invalidateQueries({ queryKey: ["helloGet"] });
  },
});

const onClick = () => {
  mutate({
    name: "李四",
  });
};
</script>

<template>
  <div>this is dashboard page</div>
  <el-button :isLoading="isPending" @click="onClick">变更数据</el-button>
</template>
