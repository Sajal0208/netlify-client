import React from 'react'
import { useParams } from 'react-router-dom'
import { IProject, useGetProjectByIdQuery } from '../features/projects/projectsApiSlice';
import { getProjectName } from '../components/Dashboard/ProjectCard';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';

const ProjectHeader = ({ project }: {
    project: IProject | undefined
}) => {
    if (!project) {
        return null
    }
    return (
        <div className='flex flex-row justify-between items-center p-5 text-gray-200 text-3xl'>
            <h1 className="">
                {getProjectName(project.repoUrl)}
            </h1>
            <div className='flex flex-row gap-x-4'>
                <Button className='bg-white text-gray-900 hover:text-gray-300 hover:bg-neutral-900 p-5'>
                    <a href={project.deployedLink} target='blank'>
                        Visit
                    </a>
                </Button>
                <Button className='bg-neutral-900 p-5'>
                    <a href={project.repoUrl} target='blank'>
                        Git Repository
                    </a>
                </Button>
            </div>
        </div>
    )
}

const ProductionCard = ({ project }: {
    project: IProject | undefined
}) => {
    return (
        <div className='m-5 border-2 border-solid bg-neutral-950 p-5 rounded-lg flex flex-row'>
            <div className="basis-1/3">
                <AspectRatio ratio={16 / 9}>
                    <img src={'/ss1.png'} alt="Project Screenshot" className='object-cover' />
                </AspectRatio>
            </div>
            <div className='basis-2/3'>

            </div>
        </div>
    )
}

const ProjectBody = ({ project }: {
    project: IProject | undefined
}) => {
    if (!project) {
        return null
    }

    const showBuildLogs = () => {
        console.log('Show build logs')
    }

    return (
        <div className='p-5 text-gray-200 mt-10 flex flex-row justify-between'>
            <div>
                <p className='text-2xl'>Production Deployment</p>
                <p className='text-md text-gray-500'>The deployment that is available to your visitors</p>
            </div>
            <div>
                <Button onClick={showBuildLogs} className='bg-neutral-900 p-5'>
                    Build Logs
                </Button>
            </div>
        </div>
    )
}

const Project = () => {
    const params = useParams();
    const projectId = params.projectId || "";
    const id = parseInt(projectId)
    const { data: project } = useGetProjectByIdQuery(id);

    return (
        <div className='mt-10'>
            <ProjectHeader project={project} />
            <ProjectBody project={project} />
            <ProductionCard project={project} />
        </div>
    )
}

export default Project