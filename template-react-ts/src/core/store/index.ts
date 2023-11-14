import { create } from "zustand";
import { StorageValue, devtools, persist } from "zustand/middleware";
import { logger } from "./loggerMiddleware";

interface ILoginInfo {
  accessToken: string;
  refreshToken?: string;
  uid?: string;
  expireAt?: string;
  expires_in?: number;
  name?: string;
}

interface ILoginInfoState {
  loginInfo: ILoginInfo | null;
  updateLoginInfo: (nextState: ILoginInfo) => void;
  clear: () => void;
}

export const loginInfoStorageKey = "login-info-storage";
export const defaultLoginInfoStorage = { state: { loginInfo: null }, version: 0 };
export type ILoginInfoStorageState = StorageValue<Pick<ILoginInfoState, "loginInfo">>;

export const useLoginInfoStore = create<ILoginInfoState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          loginInfo: null,
          updateLoginInfo: (newLoginInfo) => set(() => ({ loginInfo: newLoginInfo })),
          clear: () => set(() => ({ loginInfo: null })),
        }),
        {
          name: loginInfoStorageKey,
        },
      ),
    ),
  ),
);

interface IProjectInfo {
  projectId: string;
  projectName: string;
}

interface IProjectInfoState {
  projectInfo: IProjectInfo[] | null;
  updateProjectInfo: (nextState: IProjectInfo[]) => void;
  clear: () => void;
}

const projectInfoStorageKey = "project-info-storage";

export const useProjectInfoStore = create<IProjectInfoState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          projectInfo: null,
          updateProjectInfo: (newProjectInfo) => set(() => ({ projectInfo: newProjectInfo })),
          clear: () => set(() => ({ projectInfo: null })),
        }),
        {
          name: projectInfoStorageKey,
        },
      ),
    ),
  ),
);
