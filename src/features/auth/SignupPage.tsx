import React, { useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

const SignupPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'username') setUsername(value)
  }

  const validateData = () => {
    let res = true
    if (email === "" || password === "" || username === "") {
      toast.error("All fields are required")
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email")
      res = false
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long")
      res = false
    }
    if (username.length < 3) {
      toast.error("Username should be at least 3 characters long")
      res = false
    }

    return res
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()
    if (!validateData()) {
      return;
    }

    try {
      const result: any = await register({ email, password, username }).unwrap()
      dispatch(setCredentials({
        user: result.user,
        accessToken: result.token.accessToken
      }))
      localStorage.setItem('token', result.token.accessToken)
      setEmail('')
      setPassword('')
      setUsername('')
      navigate('/dashboard')
    }
    catch (err: any) {
      toast.error(err.data.message)
    }
  }

  return (
    <div className="flex flex-row justify-center items-center w-full min-h-screen">
      <Card className="flex flex-col items-center justify-center w-[450px] p-10">
        <img src={'https://upload.wikimedia.org/wikipedia/commons/2/2a/Blinkit-yellow-rounded.svg'} className='w-[60px] h-[60px]' />
        <h1 className="text-2xl font-bold mt-4">India's last minute app</h1>
        <h1 className="text-xl font-bold mt-4">LOGIN</h1>
        <div className="w-full flex flex-col gap-y-1 justify-start">
          <div className="flex flex-col gap-y-1 w-full mt-4">
            <Label htmlFor='email' className='font-bold text-md'>Email</Label>
            <Input id="email" name="email" type="email" value={email} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-y-1 w-full mt-4">
            <Label htmlFor='password' className='font-bold text-md'>Password</Label>
            <Input id="password" name="password" type="password" value={password} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-y-1 w-full mt-4">
            <Label htmlFor='username' className='font-bold text-md'>Username</Label>
            <Input id="username" name="username" type="text" value={username} onChange={handleChange} />
          </div>
          <Button onClick={handleRegister} className="w-full mt-4">Register</Button>
          <p className="mt-1">
            Already have an account? <Link className='text-blue-500' to='/signin'>SignIn </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SignupPage