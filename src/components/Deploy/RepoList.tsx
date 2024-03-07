import { Button } from '../ui/button'
import { ScrollArea } from "../ui/scroll"

const getSvgByLanguage = (language: string) => {
    if (!language) return './gradient_triangle.svg'
    switch (language.toLowerCase()) {
        case 'javascript':
            return './js.svg'
        case 'typescript':
            return './ts.svg'
        case 'python':
            return './python.svg'
        case 'go':
            return './go.svg'
        case 'react':
            return './react.svg'
    }
}

const convertToDays = (milliSeconds: number) => {
    return Math.floor(milliSeconds / (1000 * 60 * 60 * 24))

}

const Repo = ({ repo, onImport }: {
    repo: any;
    onImport: (url: string) => void;
}) => {
    const { name, url, created_at, language } = repo
    const date: any = new Date(created_at);
    const now = Date.now();
    const difference = now - date;

    const onClick = () => {
        onImport(url)
    }

    return (
        <div className='w-full bg-neutral-950 p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center justify-center gap-x-2'>
                <img width={25} src={getSvgByLanguage(language)} />
                <p className='text-gray-100 text-sm w-auto'>{name}</p> /
                <p className='text-gray-100 text-sm w-auto'>{convertToDays(difference)}d ago</p>
            </div>
            <div>
                <Button onClick={onClick}>
                    Import
                </Button>
            </div>
        </div>
    )
}

const RepoList = ({ repos, onImport }: {
    repos: any[]
    onImport: (url: string) => void
}) => {
    if (!repos || repos.length === 0) {
        return (
            <div>No Repos Found</div>
        )
    }

    return (
        <ScrollArea className="h-[500px] mt-5">
            <div className='flex flex-col gap-y-2'>
                {
                    repos.map((repo: any, index: number) => {
                        return (
                            <Repo onImport={onImport} key={repo.id} repo={repo} />
                        )
                    })
                }
            </div>
        </ScrollArea>

    )
}

export default RepoList