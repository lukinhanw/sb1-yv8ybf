import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

// Mock data - substituir por chamada à API
const mockCourses = [
  {
    id: 1,
    title: 'React Básico',
    category: 'Frontend',
    thumbnail: 'https://placehold.co/400x300',
    description: 'Curso introdutório de React para iniciantes'
  },
  {
    id: 2,
    title: 'JavaScript Avançado',
    category: 'Programação',
    thumbnail: 'https://placehold.co/400x300',
    description: 'Conceitos avançados de JavaScript'
  },
  {
    id: 3,
    title: 'Node.js Básico',
    category: 'Backend',
    thumbnail: 'https://placehold.co/400x300',
    description: 'Introdução ao desenvolvimento com Node.js'
  }
]

function CourseList({ onEdit }) {
  const [courses] = useState(mockCourses)

  const handleDelete = async (id) => {
    try {
      // Simulação de API - Substituir por chamada real
      toast.success('Curso removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover curso')
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{course.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(course)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseList