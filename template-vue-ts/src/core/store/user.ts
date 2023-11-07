import { defineStore } from "pinia";
import { ref } from "vue";

export interface IUserInfo {
  accessToken: string;
  name?: string;
  uid?: string;
  refreshToken?: string;
  expireAt?: string;
  expires_in?: number;
}

export const userInfoStorageKey = "userInfo";

export const useUserStore = defineStore(
  userInfoStorageKey,
  () => {
    const userInfo = ref<IUserInfo | null>(null);

    function updateUserInfo(newState: IUserInfo) {
      userInfo.value = Object.assign(userInfo.value || {}, newState);
    }

    return {
      userInfo,
      updateUserInfo,
    };
  },
  { persist: true },
);

export const defaultUserInfo = {
  accessToken: "123456",
  name: "张三",
  uid: "1",
  refreshToken: "456789",
  expireAt: "2023-12-30",
  expires_in: 1703865600,
};
