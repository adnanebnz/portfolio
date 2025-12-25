"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  Trash2,
  CheckCircle,
  MessageSquare,
  Eye,
  EyeOff,
  Reply,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { SkeletonPage } from "@/components/ui/skeleton";

// Format date helper function
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  wantsCall: boolean;
  preferredDate: string | null;
  preferredTime: string | null;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

function MessageCard({
  message,
  onToggleRead,
  onToggleReplied,
  onDelete,
}: {
  message: ContactMessage;
  onToggleRead: (id: string, read: boolean) => void;
  onToggleReplied: (id: string, replied: boolean) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card
      className={`mb-4 ${
        !message.read ? "border-primary/50 bg-primary/5" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {message.name}
              {!message.read && (
                <Badge variant="default" className="text-xs">
                  New
                </Badge>
              )}
              {message.wantsCall && (
                <Badge
                  variant="secondary"
                  className="text-xs flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Wants Call
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${message.email}`} className="hover:underline">
                {message.email}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(message.createdAt)}
            </span>
          </div>
        </div>
        {message.subject && message.subject !== "Contact Form Submission" && (
          <p className="text-sm font-medium mt-2">Subject: {message.subject}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm whitespace-pre-wrap">{message.message}</p>

        {message.wantsCall &&
          (message.preferredDate || message.preferredTime) && (
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Preferred Call Time:</span>
              {message.preferredDate && (
                <span className="text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(message.preferredDate).toLocaleDateString()}
                </span>
              )}
              {message.preferredTime && (
                <span className="text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {message.preferredTime}
                </span>
              )}
            </div>
          )}

        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleRead(message.id, !message.read)}
          >
            {message.read ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Mark Unread
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Mark Read
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleReplied(message.id, !message.replied)}
            className={message.replied ? "text-green-600 border-green-600" : ""}
          >
            {message.replied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Replied
              </>
            ) : (
              <>
                <Reply className="w-4 h-4 mr-1" />
                Mark Replied
              </>
            )}
          </Button>
          <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-1" />
              Reply via Email
            </Button>
          </a>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(message.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("unread");

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id, read }),
      });
      if (response.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read } : m))
        );
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const toggleReplied = async (id: string, replied: boolean) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id, replied }),
      });
      if (response.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, replied } : m))
        );
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const unreadMessages = messages.filter((m) => !m.read);
  const readMessages = messages.filter((m) => m.read && !m.replied);
  const repliedMessages = messages.filter((m) => m.replied);
  const callRequests = messages.filter((m) => m.wantsCall && !m.replied);

  if (isLoading) {
    return <SkeletonPage type="reviews" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8" />
            Contact Messages
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage contact form submissions and schedule calls
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg py-1 px-3">
            {unreadMessages.length} Unread
          </Badge>
          {callRequests.length > 0 && (
            <Badge
              variant="destructive"
              className="text-lg py-1 px-3 flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              {callRequests.length} Call Requests
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread
            {unreadMessages.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {unreadMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center gap-2">
            Read
            {readMessages.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {readMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="replied" className="flex items-center gap-2">
            Replied
            {repliedMessages.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {repliedMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Requests
            {callRequests.length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {callRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="mt-6">
          {unreadMessages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-muted-foreground">No unread messages</p>
              </CardContent>
            </Card>
          ) : (
            unreadMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onToggleRead={toggleRead}
                onToggleReplied={toggleReplied}
                onDelete={deleteMessage}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          {readMessages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No pending messages</p>
                <p className="text-muted-foreground">
                  All read messages have been replied to
                </p>
              </CardContent>
            </Card>
          ) : (
            readMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onToggleRead={toggleRead}
                onToggleReplied={toggleReplied}
                onDelete={deleteMessage}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="replied" className="mt-6">
          {repliedMessages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Reply className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No replied messages yet</p>
                <p className="text-muted-foreground">
                  Replied messages will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            repliedMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onToggleRead={toggleRead}
                onToggleReplied={toggleReplied}
                onDelete={deleteMessage}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="calls" className="mt-6">
          {callRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Phone className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No pending call requests</p>
                <p className="text-muted-foreground">
                  Call requests will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            callRequests.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onToggleRead={toggleRead}
                onToggleReplied={toggleReplied}
                onDelete={deleteMessage}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
