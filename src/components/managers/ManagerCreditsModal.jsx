import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

function ManagerCreditsModal({ open, onClose, employee, type }) {
  const [credits, setCredits] = useState(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Simulação de API - Substituir por chamada real
      if (type === 'add') {
        toast.success(`${credits} créditos adicionados com sucesso!`)
      } else {
        if (credits > employee.credits) {
          toast.error(`O funcionário só possui ${employee.credits} créditos`)
          return
        }
        toast.success(`${credits} créditos removidos com sucesso!`)
      }
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${type === 'add' ? 'adicionar' : 'remover'} créditos`)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {type === 'add' ? 'Adicionar Créditos' : 'Remover Créditos'}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6">
                      <div>
                        <label
                          htmlFor="credits"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Quantidade de Créditos
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={type === 'remove' ? employee?.credits : undefined}
                          value={credits}
                          onChange={(e) => setCredits(Number(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className={`w-full sm:ml-3 sm:w-auto px-4 py-2 rounded-md text-white ${
                            type === 'add' 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {type === 'add' ? 'Adicionar' : 'Remover'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full sm:mt-0 sm:w-auto px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ManagerCreditsModal