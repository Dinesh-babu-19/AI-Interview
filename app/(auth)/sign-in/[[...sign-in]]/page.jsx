import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Side: Welcome Panel with Image */}
      <div className="relative flex items-end justify-start p-10 text-white overflow-hidden">
        
        {/* Background Image */}
        <Image 
          src="/robot.jpg" // ✅ your public folder image path
          alt="Interview background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        
        {/* Optional black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            Welcome to AI Interview Mocker 
          </h1>
          <p className="text-sm max-w-md">
            AI Mock Interview is a smart platform where you can practice real interview questions with an AI interviewer, receive instant feedback, and improve your interview skills anytime.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Card */}
      <div className="flex items-center justify-center bg-gray-50">
        <SignIn />
      </div>
    </div>
  );
}
