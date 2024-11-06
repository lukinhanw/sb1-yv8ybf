import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/outline'
import ManagerCreditsModal from './ManagerCreditsModal'

// Mock data - substituir por chamada à API
const mockEmployees = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    credits: 100,
    status: 'active',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    credits: 50,
    status: 'active',
  },
]

export default function ManagerList({ onEdit }) {
  const [employees] = useState(mockEmployees)
  const [creditsModal, setCreditsModal] = useState({ open: false, type: null, employee: null })

  const handleDelete = async (id) => {
    try {
      // Simulação de API - Substituir por chamada real
      toast.success('Funcionário removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover funcionário')
    }
  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      // Simulação de API - Substituir por chamada real
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      toast.success(`Status alterado para ${newStatus}`)
    } catch (error) {
      toast.error('Erro ao alterar status')
    }
  }

  const openCreditsModal = (employee, type) => {
    setCreditsModal({ open: true, type, employee })
  }

  const closeCreditsModal = () => {
    setCreditsModal({ open: false, type: null, employee: null })
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{employee.credits}</span>
                      <button
                        onClick={() => openCreditsModal(employee, 'add')}
                        className="text-green-600 hover:text-green-900"
                        title="Adicionar créditos"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openCreditsModal(employee, 'remove')}
                        className="text-red-600 hover:text-red-900"
                        title="Remover créditos"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(employee.id, employee.status)}
                      className="text-gray-600 hover:text-gray-900 mr-4"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ManagerCreditsModal
        open={creditsModal.open}
        onClose={closeCreditsModal}
        employee={creditsModal.employee}
        type={creditsModal.type}
      />
    </>
  )
}