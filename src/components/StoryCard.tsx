type Option = {
  text: string;
  impact: number;
}

export default function StoryCard({ title, options }: { title: string, options: Option[] }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">{title}</h2>
      {options.map((opt, idx) => (
        <button
          key={idx}
          className="w-full bg-green-200 hover:bg-green-300 text-left py-2 px-4 rounded mb-2"
          onClick={() => alert(`You chose: ${opt.text}`)}
        >
          {opt.text}
        </button>
      ))}
    </div>
  )
}
