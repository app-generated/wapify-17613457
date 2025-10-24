import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Settings, User, Bell, Shield, Database, Palette, Globe, Save } from 'lucide-react'

interface UserSettings {
  name: string
  email: string
  notifications: {
    email: boolean
    push: boolean
    deadlines: boolean
    dailyDigest: boolean
  }
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    timezone: string
    dateFormat: string
  }
  privacy: {
    profilePublic: boolean
    analyticsTracking: boolean
    dataSharing: boolean
  }
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    notifications: {
      email: true,
      push: true,
      deadlines: true,
      dailyDigest: false
    },
    preferences: {
      theme: 'light',
      language: 'fr',
      timezone: 'Europe/Paris',
      dateFormat: 'DD/MM/YYYY'
    },
    privacy: {
      profilePublic: false,
      analyticsTracking: true,
      dataSharing: false
    }
  })

  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (section: keyof UserSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simulation de la sauvegarde
    console.log('Paramètres sauvegardés:', settings)
    setHasChanges(false)
    alert('Paramètres sauvegardés avec succès !')
  }

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings({
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        notifications: {
          email: true,
          push: true,
          deadlines: true,
          dailyDigest: false
        },
        preferences: {
          theme: 'light',
          language: 'fr',
          timezone: 'Europe/Paris',
          dateFormat: 'DD/MM/YYYY'
        },
        privacy: {
          profilePublic: false,
          analyticsTracking: true,
          dataSharing: false
        }
      })
      setHasChanges(true)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Palette },
    { id: 'privacy', label: 'Confidentialité', icon: Shield },
    { id: 'data', label: 'Données', icon: Database }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <User className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Informations du profil</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <Input
                        value={settings.name}
                        onChange={(e) => handleInputChange('name' as keyof UserSettings, '', e.target.value)}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse e-mail
                      </label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email' as keyof UserSettings, '', e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo de profil
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline">
                        Changer la photo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Bell className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Préférences de notification</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Notifications par e-mail</h4>
                        <p className="text-sm text-gray-600">Recevoir des notifications par e-mail</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Notifications push</h4>
                        <p className="text-sm text-gray-600">Recevoir des notifications dans le navigateur</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Rappels d\'échéance</h4>
                        <p className="text-sm text-gray-600">Être notifié des tâches qui arrivent à échéance</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.deadlines}
                        onChange={(e) => handleInputChange('notifications', 'deadlines', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Résumé quotidien</h4>
                        <p className="text-sm text-gray-600">Recevoir un résumé quotidien de vos tâches</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.dailyDigest}
                        onChange={(e) => handleInputChange('notifications', 'dailyDigest', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Palette className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Préférences d\'affichage</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thème
                      </label>
                      <select
                        value={settings.preferences.theme}
                        onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                        <option value="auto">Automatique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Langue
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuseau horaire
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Europe/Paris">Europe/Paris</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Format de date
                      </label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Paramètres de confidentialité</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Profil public</h4>
                        <p className="text-sm text-gray-600">Rendre votre profil visible publiquement</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.profilePublic}
                        onChange={(e) => handleInputChange('privacy', 'profilePublic', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Suivi analytique</h4>
                        <p className="text-sm text-gray-600">Permettre le suivi pour améliorer l\'expérience</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.analyticsTracking}
                        onChange={(e) => handleInputChange('privacy', 'analyticsTracking', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Partage de données</h4>
                        <p className="text-sm text-gray-600">Partager des données anonymisées avec des partenaires</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.dataSharing}
                        onChange={(e) => handleInputChange('privacy', 'dataSharing', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Database className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des données</h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Statistiques d\'utilisation</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tâches créées :</span>
                        <span className="font-medium text-gray-900 ml-2">127</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Temps d\'utilisation :</span>
                        <span className="font-medium text-gray-900 ml-2">45h 23m</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dernière connexion :</span>
                        <span className="font-medium text-gray-900 ml-2">Aujourd\'hui</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Compte créé :</span>
                        <span className="font-medium text-gray-900 ml-2">15 déc. 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Export des données</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Téléchargez une copie de toutes vos données
                      </p>
                      <Button variant="outline">
                        Exporter mes données
                      </Button>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-red-900 mb-2">Zone dangereuse</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Supprimer définitivement votre compte et toutes vos données
                      </p>
                      <Button variant="destructive">
                        Supprimer mon compte
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          {hasChanges && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Vous avez des modifications non sauvegardées
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleReset}>
                      Réinitialiser
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage