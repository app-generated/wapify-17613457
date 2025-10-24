import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { BarChart, PieChart, TrendingUp, Calendar, CheckSquare, Clock, AlertCircle, Target } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category: string
  dueDate?: string
  createdAt: string
}

const AnalyticsPage = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser le rapport mensuel',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-16',
      createdAt: '2024-01-11'
    },
    {
      id: '3',
      title: 'Réunion équipe projet',
      completed: true,
      priority: 'medium',
      category: 'Réunions',
      dueDate: '2024-01-14',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Révision du code source',
      completed: false,
      priority: 'medium',
      category: 'Développement',
      dueDate: '2024-01-17',
      createdAt: '2024-01-09'
    },
    {
      id: '5',
      title: 'Mise à jour documentation',
      completed: false,
      priority: 'low',
      category: 'Documentation',
      dueDate: '2024-01-20',
      createdAt: '2024-01-07'
    },
    {
      id: '6',
      title: 'Formation équipe',
      completed: true,
      priority: 'medium',
      category: 'Formation',
      dueDate: '2024-01-22',
      createdAt: '2024-01-12'
    },
    {
      id: '7',
      title: 'Entretien candidat',
      completed: true,
      priority: 'high',
      category: 'RH',
      dueDate: '2024-01-13',
      createdAt: '2024-01-06'
    },
    {
      id: '8',
      title: 'Optimisation base de données',
      completed: true,
      priority: 'medium',
      category: 'Développement',
      dueDate: '2024-01-25',
      createdAt: '2024-01-13'
    },
    {
      id: '9',
      title: 'Test utilisateur',
      completed: true,
      priority: 'high',
      category: 'Tests',
      dueDate: '2024-01-18',
      createdAt: '2024-01-05'
    },
    {
      id: '10',
      title: 'Planification sprint',
      completed: false,
      priority: 'medium',
      category: 'Planification',
      dueDate: '2024-01-19',
      createdAt: '2024-01-14'
    }
  ])

  const analytics = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    // Analyse par priorité
    const priorityStats = {
      high: {
        total: tasks.filter(task => task.priority === 'high').length,
        completed: tasks.filter(task => task.priority === 'high' && task.completed).length
      },
      medium: {
        total: tasks.filter(task => task.priority === 'medium').length,
        completed: tasks.filter(task => task.priority === 'medium' && task.completed).length
      },
      low: {
        total: tasks.filter(task => task.priority === 'low').length,
        completed: tasks.filter(task => task.priority === 'low' && task.completed).length
      }
    }

    // Analyse par catégorie
    const categoryStats = tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 }
      }
      acc[task.category].total++
      if (task.completed) {
        acc[task.category].completed++
      }
      return acc
    }, {} as Record<string, { total: number; completed: number }>)

    // Tâches en retard
    const today = new Date().toISOString().split('T')[0]
    const overdueTasks = tasks.filter(task => 
      !task.completed && task.dueDate && task.dueDate < today
    ).length

    // Tâches à venir cette semaine
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const upcomingTasks = tasks.filter(task => 
      !task.completed && task.dueDate && 
      task.dueDate >= today && 
      task.dueDate <= nextWeek.toISOString().split('T')[0]
    ).length

    return {
      total,
      completed,
      pending,
      completionRate,
      priorityStats,
      categoryStats,
      overdueTasks,
      upcomingTasks
    }
  }, [tasks])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500']
    return colors[index % colors.length]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques et Analyses</h1>
        <p className="text-gray-600">Suivez vos progrès et analysez votre productivité</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux de completion</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tâches terminées</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.completed}</p>
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
                <p className="text-2xl font-bold text-gray-900">{analytics.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Priority Analysis */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <BarChart className="h-6 w-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Analyse par priorité</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(analytics.priorityStats).map(([priority, stats]) => {
                const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {priority === 'high' ? 'Haute' : priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {stats.completed}/{stats.total} ({completionRate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getPriorityColor(priority)}`}
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Analysis */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <PieChart className="h-6 w-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Répartition par catégorie</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(analytics.categoryStats).map(([category, stats], index) => {
                const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)} mr-3`}></div>
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900 font-medium">
                        {stats.completed}/{stats.total}
                      </div>
                      <div className="text-xs text-gray-500">
                        {completionRate}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Calendar className="h-6 w-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">À venir cette semaine</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {analytics.upcomingTasks}
              </div>
              <p className="text-gray-600">
                {analytics.upcomingTasks === 0 
                  ? 'Aucune tâche prévue cette semaine' 
                  : `tâche${analytics.upcomingTasks > 1 ? 's' : ''} à terminer`
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Performance globale</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Productivité</span>
                <span className={`text-sm font-medium ${
                  analytics.completionRate >= 80 ? 'text-green-600' :
                  analytics.completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analytics.completionRate >= 80 ? 'Excellente' :
                   analytics.completionRate >= 60 ? 'Bonne' : 'À améliorer'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gestion des délais</span>
                <span className={`text-sm font-medium ${
                  analytics.overdueTasks === 0 ? 'text-green-600' :
                  analytics.overdueTasks <= 2 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analytics.overdueTasks === 0 ? 'Parfaite' :
                   analytics.overdueTasks <= 2 ? 'Correcte' : 'À améliorer'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charge de travail</span>
                <span className={`text-sm font-medium ${
                  analytics.pending <= 5 ? 'text-green-600' :
                  analytics.pending <= 10 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analytics.pending <= 5 ? 'Légère' :
                   analytics.pending <= 10 ? 'Modérée' : 'Élevée'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {(analytics.completionRate < 70 || analytics.overdueTasks > 0) && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
            <div className="space-y-3">
              {analytics.completionRate < 70 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Votre taux de completion est de {analytics.completionRate}%. 
                    Essayez de vous concentrer sur moins de tâches à la fois pour améliorer votre efficacité.
                  </p>
                </div>
              )}
              {analytics.overdueTasks > 0 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Vous avez {analytics.overdueTasks} tâche{analytics.overdueTasks > 1 ? 's' : ''} en retard. 
                    Pensez à revoir vos échéances et à prioriser ces tâches.
                  </p>
                </div>
              )}
              {analytics.priorityStats.high.total > analytics.priorityStats.high.completed && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    Concentrez-vous sur les tâches haute priorité pour maximiser votre impact.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AnalyticsPage