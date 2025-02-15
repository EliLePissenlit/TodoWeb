import { useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import './App.css'

// Types pour nos todos
type Todo = {
  id: string
  text: string
  status: 'TODO' | 'DOING' | 'DONE'
}

// Composant pour le menu à trois points
function TodoMenu({ todo }: { todo: Todo }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Supprimer
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Changer le statut
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

// Composant pour une colonne de todos
function TodoColumn({ title, todos }: { title: string; todos: Todo[] }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 min-w-[300px]">
      <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="bg-white rounded-lg p-3 flex justify-between items-center">
            <span>{todo.text}</span>
            <TodoMenu todo={todo} />
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  // Exemple de données (à remplacer par les données de l'API)
  const [todos] = useState<Todo[]>([
    { id: '1', text: 'Créer le frontend', status: 'TODO' },
    { id: '2', text: 'Connecter à l\'API', status: 'DOING' },
    { id: '3', text: 'Configurer MongoDB', status: 'DONE' }
  ])

  return (
    <div className="min-h-screen bg-todo-bg p-8" style={{ backgroundImage: 'url(/assets/background.jpeg)', backgroundSize: 'cover' }}>
      <div className="flex gap-8 justify-center">
        <TodoColumn 
          title="À FAIRE" 
          todos={todos.filter(todo => todo.status === 'TODO')} 
        />
        <TodoColumn 
          title="EN COURS" 
          todos={todos.filter(todo => todo.status === 'DOING')} 
        />
        <TodoColumn 
          title="FINIS" 
          todos={todos.filter(todo => todo.status === 'DONE')} 
        />
      </div>
    </div>
  )
}

export default App
