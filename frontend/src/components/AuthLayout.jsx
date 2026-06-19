export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between mesh-hero p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-white">TutorMatch</span>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Your learning journey<br />
            <span className="text-gradient">starts here.</span>
          </h2>
          <p className="mt-4 max-w-sm text-lg text-indigo-200/80">
            Connect with expert tutors, set your goals, and achieve more — on your schedule.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Browse qualified tutors in any subject',
              'Compare rates and read real profiles',
              'Send inquiries and start learning fast',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-indigo-100">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-indigo-300/60">Trusted by students and tutors worldwide.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-2 text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
