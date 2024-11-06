import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatsCard from '../components/dashboard/StatsCard'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import PeriodFilter from '../components/dashboard/PeriodFilter'

const mockData = {
  stats: {
    totalCourses: 25,
    activeEmployees: 12,
    completedEvaluations: 150
  },
  chartData: [
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Abr', value: 22 },
    { name: 'Mai', value: 18 },
    { name: 'Jun', value: 25 }
  ],
  activities: [
    {
      id: 1,
      type: 'course',
      description: 'Novo curso adicionado: React Avançado',
      date: '2024-03-15T10:30:00'
    },
    {
      id: 2,
      type: 'employee',
      description: 'Funcionário João Silva cadastrado',
      date: '2024-03-15T09:15:00'
    },
    {
      id: 3,
      type: 'client',
      description: 'Cliente Maria Santos vinculada ao curso de JavaScript',
      date: '2024-03-14T16:45:00'
    }
  ]
}

function Dashboard() {
  const [period, setPeriod] = useState('7d')
  const { stats, chartData, activities } = mockData

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total de Cursos"
          value={stats.totalCourses}
          icon="courses"
        />
        <StatsCard
          title="Gestores Ativos"
          value={stats.activeEmployees}
          icon="employees"
        />
        <StatsCard
          title="Avaliações Concluídas"
          value={stats.completedEvaluations}
          icon="evaluations"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Cursos por Mês
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0284c7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <ActivityFeed activities={activities} />
      </div>
    </div>
  )
}

export default Dashboard