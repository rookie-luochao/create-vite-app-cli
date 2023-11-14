import { defineStore } from "pinia";
import { ref } from "vue";

interface IProjectInfo {
  projectId: string;
  projectName: string;
}

export const useProjectInfoStore = defineStore(
  "projectInfo",
  () => {
    const projectInfo = ref<IProjectInfo | null>(null);

    function updateProjectInfo(newState: IProjectInfo) {
      projectInfo.value = Object.assign(projectInfo.value || {}, newState);
    }

    return {
      projectInfo,
      updateProjectInfo,
    };
  },
  { persist: true },
);
