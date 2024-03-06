import React, { useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

const SigninPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [login, { isLoading }] = useLoginMutation()
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
  }

  const validateData = () => {
    let res = true
    if (email === "" || password === "") {
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
    return res
  }

  const handleSignin = async (e: any) => {
    e.preventDefault()
    if (!validateData()) {
      return;
    }

    try {
      const result: any = await login({ email, password }).unwrap()
      dispatch(setCredentials({
        user: result.user,
        accessToken: result.token.accessToken
      }))
      localStorage.setItem('token', result.token.accessToken)
      setEmail('')
      setPassword('')
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
          <Button onClick={handleSignin} className="w-full mt-4">LOGIN</Button>
          <p className="mt-1">
            Don't have an account? <Link to='/signup' className='text-blue-500'>SignUp </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SigninPage