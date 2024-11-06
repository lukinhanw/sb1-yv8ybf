import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// Mock data - substituir por chamadas à API
const mockEmployees = [
  { id: 1, name: 'João Silva', credits: 100 },
  { id: 2, name: 'Maria Santos', credits: 50 }
]

const mockCourses = [
  { id: 1, title: 'React Básico' },
  { id: 2, title: 'JavaScript Avançado' },
  { id: 3, title: 'Node.js Básico' }
]

function CollaboratorModal({ open, onClose, collaborator }) {
  const [selectedCourses, setSelectedCourses] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const selectedEmployeeId = watch('employeeId')
  const selectedEmployee = mockEmployees.find(
    emp => emp.id === Number(selectedEmployeeId)
  )

  useEffect(() => {
    if (collaborator) {
      // Reset form with collaborator data
      reset({
        name: collaborator.name,
        email: collaborator.email,
        phone: collaborator.phone,
        employeeId: collaborator.employee.id.toString(),
        status: collaborator.status
      })
      // Set selected courses
      setSelectedCourses(collaborator.courses)
    } else {
      // Reset form for new collaborator
      reset({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        status: 'active'
      })
      setSelectedCourses([])
    }
  }, [collaborator, reset])

  const handleCourseToggle = (course) => {
    setSelectedCourses(prev => {
      const isSelected = prev.some(c => c.id === course.id)
      if (isSelected) {
        return prev.filter(c => c.id !== course.id)
      }
      return [...prev, course]
    })
  }

  const onSubmit = async (data) => {
    try {
      if (selectedCourses.length === 0) {
        toast.error('Selecione pelo menos um curso')
        return
      }

      if (!selectedEmployee) {
        toast.error('Selecione um gestor')
        return
      }

      if (selectedCourses.length > selectedEmployee.credits) {
        toast.error(`O gestor só possui ${selectedEmployee.credits} créditos disponíveis`)
        return
      }

      const formData = {
        ...data,
        id: collaborator?.id,
        courses: selectedCourses,
        employee: {
          id: Number(data.employeeId),
          name: selectedEmployee.name
        }
      }

      // Simulação de API - Substituir por chamada real
      console.log('Saving collaborator:', formData)
      toast.success(
        collaborator
          ? 'Colaborador atualizado com sucesso!'
          : 'Colaborador cadastrado com sucesso!'
      )
      onClose()
    } catch (error) {
      toast.error('Erro ao salvar colaborador')
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
                      {collaborator ? 'Editar Colaborador' : 'Novo Colaborador'}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nome
                        </label>
                        <input
                          type="text"
                          {...register('name', { required: 'Nome é obrigatório' })}
                          className="input-field mt-1"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email é obrigatório',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email inválido',
                            },
                          })}
                          className="input-field mt-1"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Telefone
                        </label>
                        <input
                          type="text"
                          {...register('phone', {
                            required: 'Telefone é obrigatório',
                          })}
                          className="input-field mt-1"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="employeeId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gestor Responsável
                        </label>
                        <select
                          {...register('employeeId', {
                            required: 'Gestor é obrigatório',
                          })}
                          className="input-field mt-1"
                        >
                          <option value="">Selecione um gestor</option>
                          {mockEmployees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.name} ({employee.credits} créditos)
                            </option>
                          ))}
                        </select>
                        {errors.employeeId && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.employeeId.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cursos
                        </label>
                        <div className="space-y-2">
                          {mockCourses.map((course) => (
                            <label
                              key={course.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCourses.some(c => c.id === course.id)}
                                onChange={() => handleCourseToggle(course)}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="text-sm text-gray-700">
                                {course.title}
                              </span>
                            </label>
                          ))}
                        </div>
                        {selectedEmployee && (
                          <p className="mt-2 text-sm text-gray-500">
                            Créditos necessários: {selectedCourses.length} / Disponíveis: {selectedEmployee.credits}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <select
                          {...register('status')}
                          className="input-field mt-1"
                        >
                          <option value="active">Ativo</option>
                          <option value="inactive">Inativo</option>
                        </select>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="btn-primary w-full sm:ml-3 sm:w-auto"
                        >
                          {collaborator ? 'Atualizar' : 'Cadastrar'}
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

export default CollaboratorModal