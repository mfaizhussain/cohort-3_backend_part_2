import { Link } from 'react-router'
import useUser from '../../../context/useUser'

function Profile() {
  const { user } = useUser()

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg shadow-slate-200/70">
          <h1 className="text-2xl font-bold text-slate-900">No profile yet</h1>
          <p className="mt-2 text-slate-600">
            Create an account to add your profile details.
          </p>
          <Link
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
            to="/register"
          >
            Create account
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/70 sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Your account
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>
        <dl className="mt-8 space-y-5">
          <div>
            <dt className="text-sm font-medium text-slate-500">Full name</dt>
            <dd className="mt-1 text-base text-slate-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Email address</dt>
            <dd className="mt-1 text-base text-slate-900">{user.email}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

export default Profile
