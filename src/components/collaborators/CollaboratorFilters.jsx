import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FunnelIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Mock data - substituir por dados da API
const managers = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Santos' }
]

const courses = [
  { id: 1, title: 'React Básico' },
  { id: 2, title: 'JavaScript Avançado' },
  { id: 3, title: 'Node.js Básico' }
]

const statusOptions = [
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' }
]

function FilterDropdown({ label, options, selectedValues, onChange }) {
  const isOptionSelected = (value) => selectedValues.includes(value)
  const selectedCount = selectedValues.length

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {label}
          {selectedCount > 0 && (
            <span className="ml-1 text-primary-600">({selectedCount})</span>
          )}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[100] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      const newValues = isOptionSelected(option.value)
                        ? selectedValues.filter(v => v !== option.value)
                        : [...selectedValues, option.value]
                      onChange(newValues)
                    }}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center px-4 py-2 text-sm w-full text-left`}
                  >
                    <input
                      type="checkbox"
                      checked={isOptionSelected(option.value)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                    />
                    <span className={isOptionSelected(option.value) ? 'text-primary-900 font-medium' : 'text-gray-700'}>
                      {option.label}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function ActiveFilters({ filters, onRemove }) {
  const activeFilters = []

  if (filters.status.length > 0) {
    filters.status.forEach(status => {
      const statusLabel = statusOptions.find(s => s.value === status)?.label
      activeFilters.push({ key: 'status', value: status, label: `Status: ${statusLabel}` })
    })
  }

  if (filters.managers.length > 0) {
    filters.managers.forEach(managerId => {
      const managerName = managers.find(m => m.id.toString() === managerId)?.name
      activeFilters.push({ key: 'managers', value: managerId, label: `Gestor: ${managerName}` })
    })
  }

  if (filters.courses.length > 0) {
    filters.courses.forEach(courseId => {
      const courseTitle = courses.find(c => c.id.toString() === courseId)?.title
      activeFilters.push({ key: 'courses', value: courseId, label: `Curso: ${courseTitle}` })
    })
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700">Filtros ativos:</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <span
            key={`${filter.key}-${filter.value}-${index}`}
            className="inline-flex items-center gap-x-1 rounded-md bg-primary-50 px-2 py-1 text-sm font-medium text-primary-700"
          >
            {filter.label}
            <button
              type="button"
              onClick={() => onRemove(filter.key, filter.value)}
              className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-primary-600/20"
            >
              <span className="sr-only">Remove filter</span>
              <XMarkIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <button
          onClick={() => onRemove('all')}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Limpar todos
        </button>
      </div>
    </div>
  )
}

function CollaboratorFilters({ filters, onChange }) {
  const handleFilterChange = (key, values) => {
    onChange({ ...filters, [key]: values })
  }

  const handleRemoveFilter = (key, value) => {
    if (key === 'all') {
      onChange({
        status: [],
        managers: [],
        courses: []
      })
    } else {
      onChange({
        ...filters,
        [key]: filters[key].filter(v => v !== value)
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <FunnelIcon className="h-5 w-5" />
        <span>Filtros:</span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4">
        <FilterDropdown
          label="Status"
          selectedValues={filters.status}
          onChange={(values) => handleFilterChange('status', values)}
          options={statusOptions}
        />

        <FilterDropdown
          label="Gestor"
          selectedValues={filters.managers}
          onChange={(values) => handleFilterChange('managers', values)}
          options={managers.map(manager => ({
            value: manager.id.toString(),
            label: manager.name
          }))}
        />

        <FilterDropdown
          label="Curso"
          selectedValues={filters.courses}
          onChange={(values) => handleFilterChange('courses', values)}
          options={courses.map(course => ({
            value: course.id.toString(),
            label: course.title
          }))}
        />
      </div>

      <ActiveFilters filters={filters} onRemove={handleRemoveFilter} />
    </div>
  )
}

export default CollaboratorFilters