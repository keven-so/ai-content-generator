'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

function Settings() {
  const { user } = useUser()
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }

    setLoading(false)
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    setLoading(true)

    // Sign out and redirect
    await supabase.auth.signOut()
    router.push('/')

    setMessage('Account deletion initiated. Please contact support to complete the process.')
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-5'>
      <div className='w-full max-w-2xl space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information and security</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Email Display */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                type='email'
                value={email}
                disabled
                className='bg-gray-50'
              />
              <p className='text-sm text-gray-500'>Email address cannot be changed</p>
            </div>

            {/* User ID Display */}
            <div className='space-y-2'>
              <Label htmlFor='userId'>User ID</Label>
              <Input
                id='userId'
                value={user?.id || ''}
                disabled
                className='bg-gray-50'
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </p>
              )}

              <Button type='submit' disabled={loading} className='w-full'>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className='border-red-200'>
          <CardHeader>
            <CardTitle className='text-red-600'>Danger Zone</CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant='destructive'
              onClick={handleDeleteAccount}
              disabled={loading}
              className='w-full'
            >
              Delete Account
            </Button>
            <p className='text-sm text-gray-500 mt-2'>
              This will permanently delete your account and all associated data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings
