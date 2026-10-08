import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import useUser from '../../../context/useUser'

function Register() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const password = watch('password', '')

  function onSubmit(data) {
    const { name, email } = data
    setUser({ name, email })
    navigate('/profile')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/70 sm:p-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Create your account
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Get started
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter your details below to set up your profile.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              {...register('name', {
                required: 'Please enter your name.',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters.',
                },
              })}
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="name"
              placeholder="Jane Smith"
              type="text"
            />
            {errors.name && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              {...register('email', {
                required: 'Please enter your email.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address.',
                },
              })}
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Please enter a password.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              })}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="password"
              placeholder="At least 8 characters"
              type="password"
            />
            {errors.password && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="passwordConfirmation"
            >
              Confirm password
            </label>
            <input
              {...register('passwordConfirmation', {
                required: 'Please confirm your password.',
                validate: (value) =>
                  value === password || 'Passwords do not match.',
              })}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="passwordConfirmation"
              placeholder="Re-enter your password"
              type="password"
            />
            {errors.passwordConfirmation && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>

          <button
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            type="submit"
          >
            Create account
          </button>
        </form>
      </section>
    </main>
  )
}

export default Register
