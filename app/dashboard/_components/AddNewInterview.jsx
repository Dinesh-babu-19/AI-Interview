"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuid4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {

  const[openDailog,setOpenDailog] = useState(false);
  const[jobPosition,setJobPosition] = useState();
  const[jobDesc,setJobDesc] = useState();
  const[jobExperience,setJobExperience] = useState();
  const[loading,setLoading]=useState(false);
  const[jsonResponce,setJsonResponce]=useState([]);
  const router=useRouter();

  const{user}=useUser();

  const onSubmit=async(e)=>{
    console.log(jobPosition,jobDesc)
    setLoading(true)
    e.preventDefault()

    const promptInput="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience:"+jobExperience+", Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS+" Interview question along with Answer in JSON Format, Give us Question and Answered field on JSON"
    
    const result= await chatSession.sendMessage(promptInput)

    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    setJsonResponce(MockJsonResp);

    if(MockJsonResp){
      const resp= await db.insert(MockInterview)
      .values({
        mockId:uuid4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      }).returning({mockId:MockInterview.mockId});

      if(resp){
        setOpenDailog(false); 
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }

    }else{
      console.log("ERROR");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDailog(true)}>
        <h2 className='text-xl text-center font-medium'>+Add New</h2>
      </div>
      <Dialog open={openDailog}>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
          <h2 className='text-gray-500 mb-9'>Add Details about your job position/role,Job description and years of experience</h2>
          <DialogDescription>
            <form onSubmit={onSubmit}>
            <div>
              <div className='mt-6 my-3'>
                <label>Job Role/Job Position</label>
                <Input className='mt-1.5' placeholder="Ex. Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}
                />
              </div>

              <div className='my-3'>
                <label>Job Desciption/ Tech Stack (In Short)</label>
                <Textarea className='mt-1.5' placeholder="Ex. React, Angular, NodeJS, MySQL etc" required
                onChange={(event)=>setJobDesc(event.target.value)}
                />
              </div>

              <div className='my-3'>
                <label>Years of Experience</label>
                <Input className='mt-1.5' placeholder="Ex.5" type="number" max="70" required 
                onChange={(event)=>setJobExperience(event.target.value)}
                />
              </div>

            </div>

            <div className='flex gap-5 justify-end my-2'>
              <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading?
                <>
                <LoaderCircle className='animate-spin'/>Generating from AI
                </>:'Start Interview'
                }
              </Button>
            </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddNewInterview; 