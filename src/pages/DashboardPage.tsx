import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/Dashboard/ProjectCard'
import { IProject, useGetProjectsQuery } from '../features/projects/projectsApiSlice'


const DashboardPage = () => {
  const user = useSelector(selectCurrentUser)
  const { data: project } = useGetProjectsQuery();

  return (
    <div className='mt-10 p-10 mx-20 text-gray-500'>
      <ProjectCard projects={project} />
    </div>
  )
}

export default DashboardPage