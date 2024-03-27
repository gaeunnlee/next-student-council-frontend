export const getAccessToken = (): string | null => {
   return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
   return localStorage.getItem('refreshToken');
};

export const setAccessToken = (accessToken: string) => {
   localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
   localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
   localStorage.removeItem('accessToken');
   localStorage.removeItem('refreshToken');
};

export const isLoggedIn = getAccessToken() !== null;
