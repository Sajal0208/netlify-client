import { apiSlice } from "../../app/api/apiSlice";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials {
  email: string;
  username: string;
  password: string;
}

interface IUser {
  id: number;
  email: string;
  username: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: ILoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials: IRegisterCredentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getMe: builder.query<IUser, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } =
  authApiSlice;
