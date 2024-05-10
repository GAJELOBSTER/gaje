const baseURL = `${process.env.API_URL}/api/${process.env.API_VERSION}`;

type LoginReqType = {
  loginId: string;
  password: string;
};

// 토큰 유효성 체크
const healthCheck = async (token: string) => {
  return await fetch(`${baseURL}/auth/verifyToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// refreshToken으로 신규 accessToken 재발급 요청
const reissueAccessToken = async (refreshToken: string) => {
  return await fetch(`${baseURL}/auth/refreshToken`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const logIn = async ({ body }: { body: LoginReqType }) => {
  try {
    return await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER}/api/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        loginId: body.loginId,
        password: body.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return { status: 500, msg: "서버 에러" };
  }
};

const logOut = async () => {
  try {
    return await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER}/api/logout`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return { status: 500, msg: "서버 에러" };
  }
};

export const AuthFetch = {
  healthCheck,
  reissueAccessToken,
  logIn,
  logOut,
};
