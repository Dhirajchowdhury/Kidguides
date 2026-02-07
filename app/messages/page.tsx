'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { Send, MessageCircle, Clock } from 'lucide-react'

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  read: boolean
  sender_name: string
  recipient_name: string
}

interface Conversation {
  id: string
  other_user_id: string
  other_user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
}

interface Contact {
  id: string
  full_name: string
}

export default function MessagesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [isComposing, setIsComposing] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<string>('')
  const [messageContent, setMessageContent] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const authUser = await getAuthUser()
        if (!authUser) {
          router.push('/login')
          return
        }

        const currentUser = await getCurrentUser()
        setUser(currentUser)

        // Load conversations
        const { data: messagesData } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${authUser.id},recipient_id.eq.${authUser.id}`)
          .order('created_at', { ascending: false })

        // Group into conversations
        const convMap = new Map<string, any>()
        messagesData?.forEach((msg: any) => {
          const otherId = msg.sender_id === authUser.id ? msg.recipient_id : msg.sender_id
          const otherName = msg.sender_id === authUser.id ? msg.recipient_name : msg.sender_name

          if (!convMap.has(otherId)) {
            convMap.set(otherId, {
              id: otherId,
              other_user_id: otherId,
              other_user_name: otherName,
              last_message: msg.content,
              last_message_time: msg.created_at,
              unread_count: msg.read ? 0 : 1,
            })
          }
        })

        setConversations(Array.from(convMap.values()))

        // Load contacts
        if (currentUser?.role === 'parent') {
          const { data: guidesData } = await supabase
            .from('guides')
            .select('id, full_name')
            .eq('parent_id', authUser.id)

          setContacts(guidesData || [])
        } else if (currentUser?.role === 'teacher') {
          const { data: studentsData } = await supabase
            .from('students')
            .select('id, full_name')

          setContacts(studentsData || [])
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  // Load messages for selected conversation
  useEffect(() => {
    async function loadMessages() {
      if (!selectedConversationId) return

      try {
        const authUser = await getAuthUser()
        if (!authUser) return

        const { data } = await supabase
          .from('messages')
          .select('*')
          .or(
            `and(sender_id.eq.${authUser.id},recipient_id.eq.${selectedConversationId}),and(sender_id.eq.${selectedConversationId},recipient_id.eq.${authUser.id})`
          )
          .order('created_at', { ascending: true })

        setMessages(data || [])

        // Mark as read
        if (data && data.length > 0) {
          await supabase
            .from('messages')
            .update({ read: true })
            .eq('recipient_id', authUser.id)
            .eq('sender_id', selectedConversationId)
        }
      } catch (err) {
        console.error('Failed to load messages:', err)
      }
    }

    loadMessages()
  }, [selectedConversationId])

  async function handleSendMessage() {
    if (!messageContent.trim()) return

    try {
      const authUser = await getAuthUser()
      if (!authUser) return

      const { error } = await supabase.from('messages').insert({
        sender_id: authUser.id,
        recipient_id: selectedConversationId,
        content: messageContent,
        sender_name: user?.full_name,
        recipient_name: conversations.find(c => c.other_user_id === selectedConversationId)?.other_user_name,
        read: false,
      })

      if (error) throw error

      setMessageContent('')

      // Reload messages
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${authUser.id},recipient_id.eq.${selectedConversationId}),and(sender_id.eq.${selectedConversationId},recipient_id.eq.${authUser.id})`
        )
        .order('created_at', { ascending: true })

      setMessages(data || [])
    } catch (err) {
      console.error('Failed to send message:', err)
      alert('Failed to send message')
    }
  }

  async function handleStartConversation(recipientId: string, recipientName: string) {
    setSelectedConversationId(recipientId)
    setIsComposing(false)

    // Check if conversation exists, if not create initial structure
    const { data: existingMessages } = await supabase
      .from('messages')
      .select('*')
      .eq('recipient_id', recipientId)
      .limit(1)

    if (!existingMessages || existingMessages.length === 0) {
      // Conversation doesn't exist yet, it will be created on first message
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-sm text-gray-600">Communicate with guides and tutors</p>
          </div>
          <Dialog open={isComposing} onOpenChange={setIsComposing}>
            <DialogTrigger asChild>
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription>Start a new conversation</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Recipient</label>
                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map(contact => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => {
                    const contact = contacts.find(c => c.id === selectedRecipient)
                    if (contact) {
                      handleStartConversation(contact.id, contact.full_name)
                    }
                  }}
                  className="w-full"
                >
                  Start Conversation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-0">
                  {conversations.length > 0 ? (
                    conversations.map(conv => (
                      <button
                        key={conv.other_user_id}
                        onClick={() => setSelectedConversationId(conv.other_user_id)}
                        className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors ${
                          selectedConversationId === conv.other_user_id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conv.other_user_name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{conv.last_message}</p>
                          </div>
                          {conv.unread_count > 0 && (
                            <Badge variant="default" className="text-xs">
                              {conv.unread_count}
                            </Badge>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">No conversations yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages View */}
          <Card className="lg:col-span-2">
            {selectedConversationId ? (
              <div className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-base">
                    {conversations.find(c => c.other_user_id === selectedConversationId)?.other_user_name}
                  </CardTitle>
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages.map(msg => {
                        const isOwn = msg.sender_id === user?.id
                        return (
                          <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className={`max-w-xs px-4 py-2 rounded-lg ${
                                isOwn
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isOwn ? 'text-blue-100' : 'text-gray-600'
                                }`}
                              >
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4 space-y-3">
                  <Textarea
                    placeholder="Type your message..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="min-h-20 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-base font-medium">No conversation selected</p>
                  <p className="text-sm mt-1">Select a conversation or start a new one</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
