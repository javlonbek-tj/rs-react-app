const stack = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MongoDB',
];

function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-slate-800 mb-8">
        About the author
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 px-8 py-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          Javlonbek Turdimatov
        </h2>
        <p className="text-slate-500 text-sm mb-6">Software Developer</p>

        <p className="text-slate-600 leading-relaxed mb-6">
          Currently working in a non-IT field, but actively dedicating free time
          to programming and software development. Has experience with modern
          technologies and has successfully developed and delivered several
          production-ready projects. The long-term goal is to transition into
          the IT industry and continue growing as a professional software
          developer.
        </p>

        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
          Tech stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 px-8 py-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          About this project
        </h2>
        <p className="text-slate-600 leading-relaxed">
          A Pokemon application built as part of the{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className="text-red-600 hover:underline font-medium"
          >
            RS School React course
          </a>
          . Data is sourced from the open{' '}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
            className="text-red-600 hover:underline font-medium"
          >
            PokeAPI
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default AboutPage;
