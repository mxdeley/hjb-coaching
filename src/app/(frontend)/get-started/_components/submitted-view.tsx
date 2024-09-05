export default function SubmittedView() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
        Your training begins today
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl w-full">
        {[
          {
            href: '/success-stories',
            title: 'Success Stories',
            description: 'Get inspired by others',
          },
          { href: '/programmes', title: 'Programmes', description: 'Find your perfect fit' },
          { href: '/nutrition', title: 'Nutrition', description: 'Fuel your progress' },
          { href: '/blog', title: 'Blog', description: 'Stay informed' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
