import { requireUser } from '@/lib/auth/session'
import { ProfileForm } from '@/components/sections/profile-form'

export default async function ProfilePage() {
  const session = await requireUser()
  const user = session.user as typeof session.user & {
    country?: string
    educationStatus?: string
    university?: string
    department?: string
    cgpa?: string
  }

  return (
    <div>
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Profile
      </p>
      <h1 className="text-3xl font-bold mb-8">Edit your details.</h1>

      <ProfileForm
        initial={{
          country: user.country ?? '',
          educationStatus: user.educationStatus ?? '',
          university: user.university ?? '',
          department: user.department ?? '',
          cgpa: user.cgpa ?? '',
        }}
      />
    </div>
  )
}
