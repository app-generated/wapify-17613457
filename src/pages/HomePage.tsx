import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckSquare, Plus, Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
}

const HomePage = () => {
  const [recentTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-16'
    },
    {
      id: '3',
      title: 'Réunion équipe projet',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-14'
    },
    {
      id: '4',
      title: 'Révision du code source',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-17'
    },
    {
      id: '5',
      title: 'Mise à jour documentation',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-20'
    }
  ])

  const stats = {
    totalTasks: recentTasks.length,
    completedTasks: recentTasks.filter(task => task.completed).length,
    pendingTasks: recentTasks.filter(task => !task.completed).length,
    urgentTasks: recentTasks.filter(task => task.priority === 'high' && !task.completed).length
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
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur TaskFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organisez vos tâches, suivez vos progrès et boostez votre productivité
        </p>
        <Link to="/tasks">
          <Button size="lg" className="mr-4">
            <Plus className="h-5 w-5 mr-2" />
            Créer une tâche
          </Button>
        </Link>
        <Link to="/analytics">
          <Button variant="outline" size="lg">
            <TrendingUp className="h-5 w-5 mr-2" />
            Voir les statistiques
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total des tâches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.urgentTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tâches récentes</h2>
          <Link to="/tasks">
            <Button variant="outline">
              Voir toutes les tâches
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {recentTasks.slice(0, 4).map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckSquare 
                      className={`h-5 w-5 ${
                        task.completed ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />
                    <div>
                      <h3 className={`font-medium ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.dueDate && (
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getPriorityColor(task.priority)
                    }`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gestion simplifiée
            </h3>
            <p className="text-gray-600">
              Créez, organisez et suivez vos tâches en quelques clics
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Suivi des progrès
            </h3>
            <p className="text-gray-600">
              Visualisez vos statistiques et analysez votre productivité
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Planification
            </h3>
            <p className="text-gray-600">
              Définissez des échéances et ne manquez plus jamais une deadline
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage