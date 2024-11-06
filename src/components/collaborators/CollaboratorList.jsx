import { useState, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import {
  PencilIcon,
  TrashIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import ConfirmationModal from '../common/ConfirmationModal'

// Mock data - substituir por chamada à API
const mockClients = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana@example.com',
    phone: '(11) 99999-9999',
    employee: {
      id: 1,
      name: 'João Silva'
    },
    courses: [
      { id: 1, title: 'React Básico' },
      { id: 2, title: 'JavaScript Avançado' }
    ],
    status: 'active'
  },
  {
    id: 2,
    name: 'Pedro Santos',
    email: 'pedro@example.com',
    phone: '(11) 88888-8888',
    employee: {
      id: 2,
      name: 'Maria Santos'
    },
    courses: [
      { id: 3, title: 'Node.js Básico' }
    ],
    status: 'active'
  },
  {
    id: 3,
    name: 'Higor Juiso',
    email: 'higor@example.com',
    phone: '(11) 12334-6234',
    employee: {
      id: 2,
      name: 'Maria Santos'
    },
    courses: [
      { id: 3, title: 'Node.js Básico' }
    ],
    status: 'inactive'
  }
]

function CollaboratorsList({ onEdit, filters, searchTerm }) {
  const [clients] = useState(mockClients)
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    clientId: null,
    currentStatus: null
  })

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const searchMatch = 
          client.name.toLowerCase().includes(search) ||
          client.email.toLowerCase().includes(search) ||
          client.phone.includes(search)
        if (!searchMatch) return false
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(client.status)) {
        return false
      }

      // Manager filter
      if (filters.managers.length > 0 && !filters.managers.includes(client.employee.id.toString())) {
        return false
      }

      // Course filter
      if (filters.courses.length > 0) {
        const clientCourseIds = client.courses.map(course => course.id.toString())
        const hasAnyCourse = filters.courses.some(courseId => clientCourseIds.includes(courseId))
        if (!hasAnyCourse) return false
      }

      return true
    })
  }, [clients, filters, searchTerm])

  const handleDelete = async (id) => {
    try {
      // Simulação de API - Substituir por chamada real
      toast.success('Colaborador removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover colaborador')
    }
  }

  const handleToggleStatus = async () => {
    try {
      const { clientId, currentStatus } = confirmModal
      // Simulação de API - Substituir por chamada real
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      toast.success(`Status alterado para ${newStatus === 'active' ? 'ativo' : 'inativo'}`)
      setConfirmModal({ show: false, clientId: null, currentStatus: null })
    } catch (error) {
      toast.error('Erro ao alterar status')
    }
  }

  const openConfirmModal = (id, currentStatus) => {
    setConfirmModal({
      show: true,
      clientId: id,
      currentStatus
    })
  }

  if (filteredClients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum colaborador encontrado com os filtros aplicados.</p>
      </div>
    )
  }

  return (
    <>
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
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gestor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cursos
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
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {client.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {client.employee.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {client.courses.map(course => course.title).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(client)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                    title="Editar"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openConfirmModal(client.id, client.status)}
                    className={`${
                      client.status === 'active' 
                        ? 'text-red-600 hover:text-red-900' 
                        : 'text-green-600 hover:text-green-900'
                    } mr-4`}
                    title={client.status === 'active' ? 'Desativar' : 'Ativar'}
                  >
                    {client.status === 'active' ? (
                      <NoSymbolIcon className="h-5 w-5" />
                    ) : (
                      <CheckCircleIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Excluir"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.show}
        onClose={() => setConfirmModal({ show: false, clientId: null, currentStatus: null })}
        onConfirm={handleToggleStatus}
        title={`${confirmModal.currentStatus === 'active' ? 'Desativar' : 'Ativar'} Colaborador`}
        message={`Tem certeza que deseja ${confirmModal.currentStatus === 'active' ? 'desativar' : 'ativar'} este colaborador?`}
        confirmText={confirmModal.currentStatus === 'active' ? 'Desativar' : 'Ativar'}
        confirmStyle={confirmModal.currentStatus === 'active' ? 'danger' : 'success'}
      />
    </>
  )
}

export default CollaboratorsList