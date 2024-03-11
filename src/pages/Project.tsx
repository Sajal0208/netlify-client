import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IProject, useDeleteProjectMutation, useGetProjectByIdQuery } from '../features/projects/projectsApiSlice';
import { getProjectName } from '../components/Dashboard/ProjectCard';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"

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

const getCreationDate = (date: any) => {
    const now = Date.now();
    const pastDate = new Date(date);
    const difference = now - pastDate.getTime();
    console.log('Difference', difference, date, now)
    return Math.floor(difference / (1000 * 60 * 60 * 24)) > 0 ? `${Math.floor(difference / (1000 * 60 * 60 * 24))}d ago` : "Today"
}

const DisplayCard = ({ label, value, link }: {
    label: string
    value: string
    link: boolean
}) => {
    return (
        <div className="flex flex-col items-start gap-y-1">
            <p className="text-md text-gray-400">{label}</p>
            {link ? <a href={value} target='blank' className="hover:underline text-sm text-white">{value}</a> :
                <p className="text-sm text-white">
                    {value}
                </p>}
        </div>
    )
}

const ProductionCard = ({ project }: {
    project: IProject | undefined
}) => {
    if (!project) {
        return null
    }

    return (
        <div className='m-5 border-2 border-solid bg-neutral-950 p-5 rounded-lg flex flex-row gap-x-10'>
            <div className="basis-1/3">
                <AspectRatio ratio={16 / 9}>
                    <img src={'/ss1.png'} alt="Project Screenshot" className='object-cover' />
                </AspectRatio>
            </div>
            <div className='basis-2/3 '>
                <div className='gap-y-6 flex flex-col'>
                    <DisplayCard link={true} label="Deployment" value={project.deployedLink} />
                    <div className="flex flex-row items-center gap-x-10">
                        <DisplayCard link={false} label="Status" value={'Ready'} />
                        <DisplayCard link={false} label="Created" value={`${getCreationDate(project.createdAt)}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProjectBody = ({ project }: {
    project: IProject | undefined
}) => {
    const [deleteProject, { isLoading }] = useDeleteProjectMutation();
    const navigate = useNavigate()

    if (!project) {
        return null
    }

    const onDeleteProject = async () => {
        try {
            await deleteProject(project.id).unwrap();
            toast.success('Project deleted successfully')
            navigate('/')
        } catch (e) {
            toast.error('Failed to delete project')
        }
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
            <div className="flex flex-row gap-x-2 items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete Project</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-neutral-950 text-white">
                        <p>Are you sure, you want to delete this project?</p>
                        <Button onClick={onDeleteProject} variant={'destructive'}>
                            Delete Project
                        </Button>
                    </DialogContent>
                </Dialog>
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
    console.log('Project', project)

    return (
        <div className='mt-10'>
            <ProjectHeader project={project} />
            <ProjectBody project={project} />
            <ProductionCard project={project} />
        </div>
    )
}

export default Project