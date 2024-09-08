// pages/culture/index.js
import CultureCard from '@/components/CultureCard'
import cultureData from '@/data/culture.json'

export default function CultureIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">Mithila Culture</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cultureData.topics.map((topic) => (
          <CultureCard key={topic.id} {...topic} />
        ))}
      </div>
    </div>
  )
}
