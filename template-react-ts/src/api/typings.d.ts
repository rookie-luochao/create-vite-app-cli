declare namespace CloudNativeApi {
  type CreateOrUpdateUserBody = {
    /** 手机号 */
    mobile?: string;
    /** 用户名 */
    name?: string;
  };

  type ErrorResp = {
    error?: string;
  };

  type HelloGetParams = {
    /** Name */
    name: string;
  };

  type HelloGetWithPathParams = {
    /** 名字 */
    name: string;
    /** 年龄 */
    age: number;
  };

  type HelloPostParam = {
    name?: string;
  };

  type HelloResp = {
    /** 结果 */
    data?: string;
  };

  type ListUserParams = {
    /** 手机号 */
    mobile?: string;
    /** 姓名 */
    name?: string;
    /** 页数1开始 */
    pageOffset?: number;
    /** 每页数量 */
    pageSize?: number;
  };

  type ListUserResp = {
    data?: User[];
    total?: number;
  };

  type MobileType = "移动" | "联通";

  type User = {
    createdAt?: string;
    key?: number;
    /** 电话 */
    mobile?: string;
    /** 电话运营商 */
    mobileType?: MobileType;
    /** 昵称 */
    nickName?: string;
    updatedAt?: string;
    userID?: number;
    /** 用户角色 */
    userType?: UserType;
  };

  type UserType = 0 | 1 | 2;
}
