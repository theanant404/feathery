"use client"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/edit-profile/profile-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SettingsProfilePage() {
  const router=useRouter()
  const session=useSession()
  if(session.status==='unauthenticated'){
    router.push("/sign-in")
  }
  console.log(session)
  if(session.status==='unauthenticated')return null
  return (
    <div className="space-y-6 p-10">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}