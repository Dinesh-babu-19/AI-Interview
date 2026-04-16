import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default function Home() {
  redirect('/dashboard');
}
