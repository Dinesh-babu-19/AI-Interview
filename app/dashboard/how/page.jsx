'use client';
import { Button } from '@/components/ui/button';
import { Brain, MessageSquareText, ThumbsUp, Sparkles } from 'lucide-react';
import Link from 'next/link';


export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: 'Interview with AI',
      description: 'Get asked real interview questions by our AI powered by LLMs trained for job roles.',
    },
    {
      icon: <MessageSquareText className="h-8 w-8 text-indigo-600" />,
      title: 'Receive Instant Feedback',
      description: 'Get accurate, unbiased feedback on your answers immediately after the interview.',
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-indigo-600" />,
      title: 'Improve Your Skills',
      description: 'Track performance, improve weak areas, and retake interviews as often as you like.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 md:px-20 py-12 mt-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-gray-600">
            Practice your job interview with AI, get feedback, and improve your confidence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/dashboard">
            <Button className="text-lg px-8 py-4">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Interview          
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
