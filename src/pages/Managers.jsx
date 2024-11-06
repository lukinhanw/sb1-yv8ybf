import { useState } from 'react'
import ManagerList from '../components/managers/ManagerList'
import ManagerModal from '../components/managers/ManagerModal'
import { PlusIcon } from '@heroicons/react/24/outline'

function Managers() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedManager, setSelectedManager] = useState(null)

  const handleOpenModal = (manager = null) => {
    setSelectedManager(manager)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedManager(null)
    setIsModalOpen(false)
  }

  const handleSaveManager = async (formData) => {
    // API call simulation
    console.log('Saving manager:', formData)
    handleCloseModal()
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Gestores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os gestores do sistema
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Novo Gestor
          </button>
        </div>
      </div>

      <ManagerList onEdit={handleOpenModal} />

      <ManagerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        manager={selectedManager}
        onSave={handleSaveManager}
      />
    </div>
  )
}

export default Managers