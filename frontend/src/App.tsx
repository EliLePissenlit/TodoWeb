import { useQuery, useMutation } from '@apollo/client';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { GET_TODOS, DELETE_TODO, UPDATE_TODO_STATUS, CREATE_TODO } from './graphql/queries';
import './App.css';

type Todo = {
  id: string;
  text: string;
  status: 'TODO' | 'DOING' | 'DONE';
  completed: boolean;
  createdAt: string;
};

function TodoMenu({ todo, onStatusChange }: { todo: Todo; onStatusChange?: (newStatus: 'TODO' | 'DOING' | 'DONE') => void }) {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const [updateStatus] = useMutation(UPDATE_TODO_STATUS, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleDelete = () => {
    if (todo.id !== 'static-1') {
      deleteTodo({ variables: { id: todo.id } });
    }
  };

  const handleStatusChange = (newStatus: 'TODO' | 'DOING' | 'DONE') => {
    if (todo.id === 'static-1' && onStatusChange) {
      onStatusChange(newStatus);
    } else {
      updateStatus({ variables: { id: todo.id, status: newStatus } });
    }
  };

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
                  onClick={handleDelete}
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
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-500 mb-2">Changer le statut:</p>
                  <div className="space-y-1">
                    {['TODO', 'DOING', 'DONE']
                      .filter(status => status !== todo.status)
                      .map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status as 'TODO' | 'DOING' | 'DONE')}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } w-full text-left px-2 py-1 text-sm text-gray-700 rounded hover:bg-gray-50`}
                        >
                          {status === 'TODO' ? 'À faire' : status === 'DOING' ? 'En cours' : 'Terminé'}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function CreateTodoForm({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await createTodo({ variables: { text: text.trim() } });
      setText('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-3 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nouvelle tâche..."
        className="flex-1 text-sm border-none focus:outline-none"
        autoFocus
      />
      <button
        type="submit"
        className="px-3 py-1 bg-todo-card text-white text-sm rounded hover:bg-opacity-90"
      >
        OK
      </button>
    </form>
  );
}

function TodoColumn({ title, todos, onStatusChange }: { 
  title: string; 
  todos: Todo[];
  onStatusChange?: (todo: Todo) => ((newStatus: 'TODO' | 'DOING' | 'DONE') => void) | undefined;
}) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {title === "À FAIRE" && !isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-100"
          >
            <img src="/assets/logo.png" alt="Ajouter" className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {title === "À FAIRE" && isCreating && (
          <CreateTodoForm onClose={() => setIsCreating(false)} />
        )}
        {todos.map(todo => (
          <div key={todo.id} className="bg-white rounded-lg p-3 flex justify-between items-center">
            <span>{todo.text}</span>
            <TodoMenu 
              todo={todo} 
              onStatusChange={onStatusChange ? onStatusChange(todo) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [staticTodoStatus, setStaticTodoStatus] = useState<'TODO' | 'DOING' | 'DONE'>('TODO');

  if (loading) return (
    <div className="min-h-screen bg-todo-bg p-8 flex items-center justify-center">
      <p className="text-white text-xl">Chargement...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-todo-bg p-8 flex items-center justify-center">
      <p className="text-white text-xl">Erreur: {error.message}</p>
    </div>
  );

  const staticTodo: Todo = {
    id: 'static-1',
    text: 'Prendre Elodie en alternance',
    status: staticTodoStatus,
    completed: false,
    createdAt: new Date().toISOString()
  };

  const todos = [...(data?.todos || []), staticTodo];

  return (
    <div className="min-h-screen bg-todo-bg" style={{ backgroundImage: 'url(/assets/background.jpeg)', backgroundSize: 'cover' }}>
      {/* En-tête */}
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <img src="/assets/logo.png" alt="Addit Logo" className="h-12 w-12" />
          <h1 className="text-4xl font-bold text-white tracking-tight">Addit'</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto p-8">
        <div className="flex gap-8 justify-center">
          <TodoColumn 
            title="À FAIRE" 
            todos={todos.filter((todo: Todo) => todo.status === 'TODO')} 
            onStatusChange={todo => todo.id === 'static-1' ? setStaticTodoStatus : undefined}
          />
          <TodoColumn 
            title="EN COURS" 
            todos={todos.filter((todo: Todo) => todo.status === 'DOING')} 
            onStatusChange={todo => todo.id === 'static-1' ? setStaticTodoStatus : undefined}
          />
          <TodoColumn 
            title="FINIS" 
            todos={todos.filter((todo: Todo) => todo.status === 'DONE')} 
            onStatusChange={todo => todo.id === 'static-1' ? setStaticTodoStatus : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
