"use client"
import { useParams } from 'next/navigation';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {use} from "react";


function StartInterview({ params }) {
    const { interviewId } = use(params);

    const [interviewData, setInterviewData] = useState();
    const [mockIntervieQuestoins, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId))
        let rawJson = result[0].jsonMockResp;

// Remove Markdown code fences and trim spaces
        rawJson = rawJson.replace(/```json/g, "").replace(/```/g, "").trim();

        let jsonMockResp;
        try {
            jsonMockResp = JSON.parse(rawJson);
            setMockInterviewQuestions(jsonMockResp);
            setInterviewData(result[0]);
        } catch (err) {
            console.error("Failed to parse JSON:", err, rawJson);
        }
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionSection mockIntervieQuestoins={mockIntervieQuestoins}
                    activeQuestionIndex={activeQuestionIndex}
                />


                {/* Video/Audio recording */}
                <RecordAnswerSection
                    mockIntervieQuestoins={mockIntervieQuestoins}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex>0&&
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                {activeQuestionIndex!=mockIntervieQuestoins?.length-1&&
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} >Next Question</Button>}
                {activeQuestionIndex==mockIntervieQuestoins?.length-1&&
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button>End Interview</Button> 
                </Link>}
                
            </div>
        </div>
    )
}

export default StartInterview;