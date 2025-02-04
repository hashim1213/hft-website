import { ReactNode } from 'react'

interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex items-start p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}