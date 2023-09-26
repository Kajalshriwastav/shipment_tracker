'use client'
import Image from 'next/image'
import Login from './login/page'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {

const data = useSession()
console.log(data)
  return (
   <>

<Login></Login>
   </>
  )
}
