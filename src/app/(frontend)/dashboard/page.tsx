'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BMICalculator from './_components/bmi-components'
import { UserButton } from '@clerk/nextjs'
import WorkoutTracker from './_components/workout-tracker'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      const searchInput = document.getElementById('search') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        } min-h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <span
              className={`text-2xl font-semibold transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              Dashboard
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 p-4">
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${!sidebarOpen && 'justify-center'}`}
            >
              <Home className="h-5 w-5" />
              <span
                className={`ml-2 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
              >
                Home
              </span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${!sidebarOpen && 'justify-center'}`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span
                className={`ml-2 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
              >
                Dashboard
              </span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${!sidebarOpen && 'justify-center'}`}
            >
              <Users className="h-5 w-5" />
              <span
                className={`ml-2 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
              >
                Users
              </span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${!sidebarOpen && 'justify-center'}`}
            >
              <Settings className="h-5 w-5" />
              <span
                className={`ml-2 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
              >
                Settings
              </span>
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search (⌘K / Ctrl+K)"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6" />
              </Button>
              <div className="ml-3 relative">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto ">
            <BMICalculator />
            <WorkoutTracker />
          </div>
        </main>
      </div>
    </div>
  )
}
