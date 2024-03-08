import { apiSlice } from "../../app/api/apiSlice";

export interface IProject {
  id: number;
  title: string;
  repoUrl: string;
  siteName: string;
  deployedLink: string;
  deploymentStatus: string;
}

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IProject[], void>({
      query: () => "/projects",
    }),
    deleteProject: builder.mutation({
      query: (id: number) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
    createProject: builder.mutation({
      query: (project: IProject) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
    }),
    getProjectById: builder.query<IProject, number>({
      query: (id: number) => `/projects/${id}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useGetProjectByIdQuery,
} = projectsApiSlice;
