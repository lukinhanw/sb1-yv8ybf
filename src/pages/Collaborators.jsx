import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import CollaboratorList from '../components/collaborators/CollaboratorList'
import CollaboratorModal from '../components/collaborators/CollaboratorModal'
import CollaboratorFilters from '../components/collaborators/CollaboratorFilters'
import CollaboratorSearch from '../components/collaborators/CollaboratorSearch'

function Collaborators() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollaborator, setSelectedCollaborator] = useState(null)
  const [filters, setFilters] = useState({
    status: [],
    managers: [],
    courses: []
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleEdit = (collaborator) => {
    setSelectedCollaborator(collaborator)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setSelectedCollaborator(null)
    setIsModalOpen(false)
  }

  const handleNew = () => {
    setSelectedCollaborator(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Colaboradores</h1>
        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Novo Colaborador
        </button>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <CollaboratorSearch value={searchTerm} onChange={setSearchTerm} />
        <div className="border-t border-gray-200 pt-6">
          <CollaboratorFilters filters={filters} onChange={setFilters} />
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Resultados
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Lista de colaboradores com os filtros aplicados
          </p>
        </div>
        <CollaboratorList 
          onEdit={handleEdit} 
          filters={filters}
          searchTerm={searchTerm}
        />
      </div>
      
      <CollaboratorModal
        open={isModalOpen}
        onClose={handleClose}
        collaborator={selectedCollaborator}
      />
    </div>
  )
}

export default Collaborators