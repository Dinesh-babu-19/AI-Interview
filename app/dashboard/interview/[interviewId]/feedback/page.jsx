"use client"
import { db } from '@/utils/db'
import { UserAnwer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'




function Feedback({ params }) {
    const unwrappedParams = use(params); // ✅ unwrap the params
   const interviewId = unwrappedParams.interviewId;

    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnwer)
            .where(eq(UserAnwer.mockIdRef,interviewId))
            .orderBy(UserAnwer.id);

        setFeedbackList(result);
    }

    return (
        <div className="p-10 min-h-screen flex flex-col items-center">
    {feedbackList?.length === 0 ? (
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008H14.25V9.75zM12 15.75c1.5 0 2.25-.75 3-1.5m4.5-2.25a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {/* Message */}
        <h2 className="font-bold text-3xl text-gray-500">No Interview Record Found</h2>
        <p className="text-gray-400 max-w-md">
          Looks like you haven't taken a mock interview yet. Start one now and receive AI-powered feedback!
        </p>
      </div>
    ) : (
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
        <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
        <h2 className="text-primary text-lg my-3">
          Your overall interview rating: <strong>7/10</strong>
        </h2>
        <h2 className="text-sm text-gray-500 mb-5">
          Find below interview questions with correct answer, your answer and feedback for improvement
        </h2>

        {feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
              {item.question}
              <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>

            <CollapsibleContent className="w-full">
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-red-500 p-2 border-x rounded-lg w-full">
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className="p-2 border rounded-sm bg-red-50 text-sm w-full text-red-900">
                  <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-sm bg-green-50 text-sm w-full text-green-900">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-sm bg-blue-50 text-sm w-full text-primary">
                  <strong>Feedback: </strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    )}

    {/* Button directly below the content, centered */}
    <div className="mt-8">
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  </div>
    )
}

export default Feedback;