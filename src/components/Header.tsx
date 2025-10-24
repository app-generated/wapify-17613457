import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, BarChart, Settings } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/tasks', label: 'Mes Tâches', icon: CheckSquare },
    { path: '/analytics', label: 'Statistiques', icon: BarChart },
    { path: '/settings', label: 'Paramètres', icon: Settings },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaskFlow</span>
          </div>
          
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header