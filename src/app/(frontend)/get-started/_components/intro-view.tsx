type Props = {
  onStart: () => void
}

export default function IntroView({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      <div className="w-full md:w-[55%] bg-gray-900 transform -skew-y-[15deg] md:skew-y-0 md:-skew-x-[15deg] origin-top-left md:origin-top-right overflow-hidden absolute inset-0 z-50 h-[55%] md:h-full">
        <div className="transform skew-y-[15deg] md:skew-y-0 md:skew-x-[15deg] h-full flex flex-col items-center justify-center p-4 md:p-0">
          <div className="absolute top-4 left-4">
            <a
              href="./"
              className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Home
            </a>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center max-w-2xl mt-12 md:mt-0">
            Fill out a short survey to find out the best workout plan for you
          </h2>
          <button
            onClick={onStart}
            className="mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/questionaire-2.jpg')" }}
      />
    </div>
  )
}
