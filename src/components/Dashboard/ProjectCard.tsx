import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { IProject } from '@/src/features/projects/projectsApiSlice'
import { getSvgByLanguage } from '../Deploy/RepoList'

const Card = ({ project }: {
    project: IProject
}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            navigate(`/dashboard/project/${project.id}`)
        }} className="hover:cursor-pointer hover:border-white hover:border-solid hover:border-2 bg-neutral-950 rounded-lg p-5 gap-y-4 flex flex-col">
            <div className='flex flex-row items-center gap-x-4'>
                <LanguageBadge language='' />
                <div className='flex flex-col'>
                    <p className=' cursor-pointer text-sm text-gray-300'>{getProjectName(project.repoUrl)}</p>
                    <DisplayUrl url={project.deployedLink} />
                </div>
            </div>
            <GithubBadge url={project.repoUrl} />
        </div>
    )
}

const ProjectCard = ({
    projects
}: {
    projects: any
}) => {
    if (!projects || projects.length === 0) {
        return <>
            <div className="gap-y-2 flex flex-col justify-start">
                <h1 className="text-white text-3xl">No Projects Found</h1>
                <Button variant={'link'} className="w-[400px] flex flex-row justify-start p-0 m-0">
                    <Link to="/deploy" className="text-gray-500">Deploy a new project</Link>
                </Button>
            </div>
        </>
    }

    return (
        <div className="w-full p-10 items-center grid gap-4 flex-wrap justify-between after:content-none after:flex-auto" style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))"
        }}>
            {
                projects.map((project: IProject) => {
                    return (
                        <>
                            <Card project={project} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default ProjectCard

export const getProjectName = (url: string) => {
    const urlArr = url.split('/')
    return urlArr[urlArr.length - 1]
}

const LanguageBadge = ({ language }: {
    language: string
}) => {
    return (
        <div className='rounded-xl bg-slate-700 w-[40px]'>
            <img width={40} src={getSvgByLanguage('react')} />
        </div>
    )
}

const GithubBadge = ({ url }: {
    url: string
}) => {
    const displayedUrl = url.split('/').splice(-2).join('/');

    return (
        <a href={url} target='blank' className='hover:cursor-pointer rounded-full bg-neutral-900 text-white p-2 flex flex-row gap-x-2'>
            <img width={25} src={'./github-mark.svg'} />
            <p>{displayedUrl}</p>
        </a>
    )
}


const DisplayUrl = ({ url }: {
    url: string
}) => {
    const displayedUrl = url.length > 30 ? url.slice(0, 30) + "..." : url;
    return (
        <a href={url} target='blank' className='text-sm text-gray-300 hover:underline '>{displayedUrl}</a>
    )
}


