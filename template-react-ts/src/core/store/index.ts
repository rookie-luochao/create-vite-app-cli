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

interface IProject {
  projectId: string;
  projectName: string;
}

interface IProjectState {
  projectInfo: IProject[] | null;
  updateProjectInfo: (nextState: IProject[]) => void;
  clear: () => void;
}

export const loginInfoStorageKey = "login-storage";
export const defaultLoginInfoStorage = { state: { loginInfo: null }, version: 0 };
export type ILoginInfoStorageState = StorageValue<Pick<ILoginInfoState, "loginInfo">>;

export const useLoginStore = create<ILoginInfoState>()(
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

const projectInfoStorageKey = "project-storage";

export const useProjectStore = create<IProjectState>()(
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
