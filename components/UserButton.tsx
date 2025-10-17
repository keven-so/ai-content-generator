'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Button } from './ui/button'

export function UserButton() {
  const [user, setUser] = useState<User | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-semibold">
          {user.email?.[0].toUpperCase()}
        </div>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
