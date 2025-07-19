import React from 'react'
import Link from "next/link";
import Image from "next/image"
import { auth, signOut, signIn } from '@/auth';


const Navbar = async () => {
    const session = await auth();
    

    return (
        <>

            <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
                <nav className='flex justify-between items-center'>
                    <Link href="/">
                        <div className='logo flex'>
                            <div className='text-2xl font-bold text-pink-600'>IDEA</div>
                            <div className='text-2xl font-semibold text-black'>Loop</div>
                        </div>
                        {/* <Image src="/logo.png" alt="logo" width={144} height={30}></Image>  */}
                    </Link>

                    <div className='flex items-center gap-5 text-black'>
                        {session && session?.user ? (
                            <>
                                <Link href="/startup/create"> <span>Create</span> </Link>

                                <form action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: "/" });
                                }}>
                                    <button type='submit'>Logout </button>
                                </form>


                                <Link href={`/user/${session?.id}`}>
                                    <span> {session?.user?.name}</span>
                                    
                                </Link>
                            </>
                        ) : (
                            <form action={async () => {
                                "use server"
                                await signIn('github')
                            }}>
                                <button type='submit'>Login</button>
                            </form>

                        )}
                    </div>

                </nav>
            </div>
        </>
    )
}

export default Navbar
