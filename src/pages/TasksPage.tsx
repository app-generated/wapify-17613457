import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Search, Filter, Edit, Trash, Calendar, CheckSquare } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category: string
  dueDate?: string
  createdAt: string
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser le rapport mensuel',
      description: 'Compiler les données de vente et créer le rapport pour la direction',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      description: 'Créer les slides pour la réunion avec le client ABC Corp',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-16',
      createdAt: '2024-01-11'
    },
    {
      id: '3',
      title: 'Réunion équipe projet',
      description: 'Point hebdomadaire sur l\'avancement du projet X',
      completed: true,
      priority: 'medium',
      category: 'Réunions',
      dueDate: '2024-01-14',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Révision du code source',
      description: 'Revoir le code du module authentification',
      completed: false,
      priority: 'medium',
      category: 'Développement',
      dueDate: '2024-01-17',
      createdAt: '2024-01-09'
    },
    {
      id: '5',
      title: 'Mise à jour documentation',
      description: 'Mettre à jour la documentation technique du projet',
      completed: false,
      priority: 'low',
      category: 'Documentation',
      dueDate: '2024-01-20',
      createdAt: '2024-01-07'
    },
    {
      id: '6',
      title: 'Formation équipe',
      description: 'Organiser une session de formation sur les nouvelles technologies',
      completed: false,
      priority: 'medium',
      category: 'Formation',
      dueDate: '2024-01-22',
      createdAt: '2024-01-12'
    },
    {
      id: '7',
      title: 'Entretien candidat',
      description: 'Entretien avec le candidat pour le poste de développeur',
      completed: true,
      priority: 'high',
      category: 'RH',
      dueDate: '2024-01-13',
      createdAt: '2024-01-06'
    },
    {
      id: '8',
      title: 'Optimisation base de données',
      description: 'Analyser et optimiser les requêtes lentes',
      completed: false,
      priority: 'medium',
      category: 'Développement',
      dueDate: '2024-01-25',
      createdAt: '2024-01-13'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: '',
    dueDate: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        category: newTask.category || 'Général',
        dueDate: newTask.dueDate || undefined,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTasks([task, ...tasks])
      setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
      setShowAddForm(false)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate || ''
    })
    setShowAddForm(true)
  }

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTask && newTask.title.trim()) {
      const updatedTasks = tasks.map(task => 
        task.id === editingTask.id 
          ? {
              ...task,
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              category: newTask.category || 'Général',
              dueDate: newTask.dueDate || undefined
            }
          : task
      )
      setTasks(updatedTasks)
      setEditingTask(null)
      setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute'
      case 'medium': return 'Moyenne'
      case 'low': return 'Basse'
      default: return priority
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Tâches</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Add/Edit Task Form */}
      {showAddForm && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h3>
            <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Titre de la tâche"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description de la tâche"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="Catégorie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d\'échéance
                  </label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingTask(null)
                    setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingTask ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les priorités</option>
                <option value="high">Haute priorité</option>
                <option value="medium">Priorité moyenne</option>
                <option value="low">Basse priorité</option>
              </select>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En cours</option>
                <option value="completed">Terminées</option>
              </select>
            </div>
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {filteredTasks.length} tâche(s)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="mt-1"
                  >
                    <CheckSquare 
                      className={`h-5 w-5 ${
                        task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                      }`}
                    />
                  </button>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getPriorityColor(task.priority)
                      }`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {task.category}
                      </span>
                      {task.dueDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTask(task)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune tâche trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterPriority !== 'all' || filterStatus !== 'all'
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par créer votre première tâche'
              }
            </p>
            {!searchTerm && filterPriority === 'all' && filterStatus === 'all' && (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Créer ma première tâche
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TasksPage