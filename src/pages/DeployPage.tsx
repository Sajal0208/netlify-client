import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import RepoList from '../components/Deploy/RepoList'

const DeployPage = () => {
    const [githubUsername, setGithubUsername] = useState('')
    const [githubConnectionStatus, setGithubConnectionStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [repos, setRepos] = useState([])

    const fetchRepos = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`)
            const sortedRepoByCreationDate = response.data.sort((a: any, b: any) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            })
            setRepos(sortedRepoByCreationDate)
        } catch (e) {
            toast.error('Error connecting to Github')
        }
        setGithubConnectionStatus(true)
        setLoading(false)
    }

    const onImport = (url: string) => {
        console.log(url)
    }

    return (
        <div className='mt-10 p-10 mx-20 text-gray-500 w-[600px]'>
            <div className='text-gray-500'>
                <h1 className='text-gray-100 text-3xl'>Let's Build Something New</h1>
                <p className='text-sm mt-1'> To deploy a new Project, import an existing Git Repository or paste an existing Github Repository URL</p>
            </div>
            <div className='mt-10'>
                <Tabs defaultValue="account" className="w-[500px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="import">Import</TabsTrigger>
                        <TabsTrigger value="repoUrl">Repo URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="import">
                        {!githubConnectionStatus ? <div className='mt-5'>
                            <Input onChange={(e) => {
                                setGithubUsername(e.target.value)
                            }} value={githubUsername} type="text" placeholder='Enter your Github Username' className='w-full p-2 bg-gray-800 text-gray-100' />
                            <Button onClick={fetchRepos} className='mt-2 bg-blue-500 p-2 w-full text-gray-100'>Connect</Button>
                        </div> : <div>
                            <RepoList onImport={onImport} repos={repos} />
                        </div>}
                    </TabsContent>
                    <TabsContent value="repoUrl">
                        <div className='mt-5'>
                            <Input type="text" placeholder='Enter your repository URL' className='w-full p-2 bg-gray-800 text-gray-100' />
                            <Button className='mt-2 bg-blue-500 p-2 w-full text-gray-100'>Import</Button>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

export default DeployPage