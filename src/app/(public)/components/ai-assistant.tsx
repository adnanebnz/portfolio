"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Calendar,
  MessageCircle,
  Briefcase,
  HelpCircle,
  Clock,
  CheckCircle,
  User,
  Mail,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  options?: QuickOption[];
}

interface QuickOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ScheduleData {
  name: string;
  email: string;
  date: string;
  time: string;
  topic: string;
}

const translations = {
  en: {
    title: "Assistant",
    subtitle: "I'm here to help!",
    placeholder: "Type your message...",
    greeting:
      "👋 Hi there! I'm the assistant for this portfolio. How can I help you today?",
    quickActions: "Here are some things I can help you with:",
    scheduleCall: "Schedule a Call",
    bookMeeting: "Book a Meeting",
    askQuestion: "Ask a Question",
    viewProjects: "View Projects",
    learnMore: "Learn About Services",
    schedulingTitle: "📅 Let's schedule a call!",
    schedulingName: "Your Name",
    schedulingEmail: "Your Email",
    schedulingDate: "Preferred Date",
    schedulingTime: "Preferred Time",
    schedulingTopic: "Topic to discuss",
    schedulingSubmit: "Schedule Call",
    scheduleRedirect:
      "🗓️ I'd recommend using our dedicated scheduling page for a better experience! Click the button below to pick a time that works for you.",
    goToSchedule: "Open Scheduler",
    schedulingSuccess:
      "✅ Perfect! Your call request has been submitted. You'll receive a confirmation email shortly.",
    projectsInfo:
      "🚀 Here are some featured projects you can check out:\n\n• **Portfolio Website** - A modern, bilingual portfolio\n• **Check out the Projects page** for more details\n\nWould you like me to help you with something else?",
    servicesInfo:
      "💼 Here are the services offered:\n\n• **Web Development** - Full-stack applications\n• **Mobile Apps** - Cross-platform development\n• **Consulting** - Technical architecture\n• **API Integration** - Third-party services\n\nWould you like to schedule a consultation call?",
    questionPrompt:
      "Sure! What would you like to know? I can help with:\n\n• Technical skills and expertise\n• Availability for projects\n• Past experience and projects\n• Pricing and timeline estimates",
    fallbackResponse:
      "Thanks for your message! I've noted that down. For more detailed inquiries, feel free to use the contact form below or schedule a call with me directly. Is there anything specific I can help you with?",
    timeSlots: [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ],
  },
  fr: {
    title: "Assistant",
    subtitle: "Je suis là pour vous aider !",
    placeholder: "Tapez votre message...",
    greeting:
      "👋 Bonjour ! Je suis l'assistant de ce portfolio. Comment puis-je vous aider aujourd'hui ?",
    quickActions: "Voici ce que je peux faire pour vous :",
    scheduleCall: "Planifier un appel",
    bookMeeting: "Réserver un rendez-vous",
    askQuestion: "Poser une question",
    viewProjects: "Voir les projets",
    learnMore: "En savoir plus sur les services",
    schedulingTitle: "📅 Planifions un appel !",
    schedulingName: "Votre nom",
    schedulingEmail: "Votre email",
    schedulingDate: "Date préférée",
    schedulingTime: "Heure préférée",
    schedulingTopic: "Sujet à discuter",
    schedulingSubmit: "Planifier l'appel",
    scheduleRedirect:
      "🗓️ Je vous recommande d'utiliser notre page de planification dédiée pour une meilleure expérience ! Cliquez sur le bouton ci-dessous pour choisir un créneau.",
    goToSchedule: "Ouvrir l'agenda",
    schedulingSuccess:
      "✅ Parfait ! Votre demande d'appel a été soumise. Vous recevrez bientôt un email de confirmation.",
    projectsInfo:
      "🚀 Voici quelques projets phares :\n\n• **Site Portfolio** - Un portfolio moderne et bilingue\n• **Consultez la page Projets** pour plus de détails\n\nPuis-je vous aider avec autre chose ?",
    servicesInfo:
      "💼 Voici les services proposés :\n\n• **Développement Web** - Applications full-stack\n• **Applications Mobiles** - Développement cross-platform\n• **Consulting** - Architecture technique\n• **Intégration API** - Services tiers\n\nSouhaitez-vous planifier un appel de consultation ?",
    questionPrompt:
      "Bien sûr ! Que souhaitez-vous savoir ? Je peux vous aider avec :\n\n• Compétences techniques et expertise\n• Disponibilité pour les projets\n• Expérience passée et projets\n• Estimations de prix et délais",
    fallbackResponse:
      "Merci pour votre message ! J'en ai pris note. Pour des demandes plus détaillées, n'hésitez pas à utiliser le formulaire de contact ci-dessous ou à planifier un appel directement. Y a-t-il quelque chose de spécifique avec lequel je peux vous aider ?",
    timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },
};

export default function AIAssistant() {
  const t = useTranslations("contact");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showScheduleRedirect, setShowScheduleRedirect] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: "",
  });
  const [locale, setLocale] = useState<"en" | "fr">("en");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tr = translations[locale];

  useEffect(() => {
    // Get locale from cookie
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale === "fr" || cookieLocale === "en") {
      setLocale(cookieLocale);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMessages((prev) => {
        if (prev.length === 0) {
          // Initial greeting with quick options
          const greeting: Message = {
            id: "greeting",
            role: "assistant",
            content: tr.greeting,
            timestamp: new Date(),
            options: [
              {
                label: tr.bookMeeting,
                value: "schedule",
                icon: <Calendar className="w-4 h-4" />,
              },
              {
                label: tr.askQuestion,
                value: "question",
                icon: <HelpCircle className="w-4 h-4" />,
              },
              {
                label: tr.viewProjects,
                value: "projects",
                icon: <Briefcase className="w-4 h-4" />,
              },
              {
                label: tr.learnMore,
                value: "services",
                icon: <Sparkles className="w-4 h-4" />,
              },
            ],
          };
          return [greeting];
        }
        return prev;
      });
    }
  }, [isOpen, tr]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMessage = (
    content: string,
    role: "user" | "assistant",
    options?: QuickOption[]
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleQuickOption = (value: string) => {
    switch (value) {
      case "schedule":
        addMessage(tr.bookMeeting, "user");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage(tr.scheduleRedirect, "assistant");
            setShowScheduleRedirect(true);
          }, 1000);
        }, 300);
        break;
      case "question":
        addMessage(tr.askQuestion, "user");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage(tr.questionPrompt, "assistant");
          }, 1000);
        }, 300);
        break;
      case "projects":
        addMessage(tr.viewProjects, "user");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage(tr.projectsInfo, "assistant", [
              {
                label: tr.bookMeeting,
                value: "schedule",
                icon: <Calendar className="w-4 h-4" />,
              },
              {
                label: tr.askQuestion,
                value: "question",
                icon: <HelpCircle className="w-4 h-4" />,
              },
            ]);
          }, 1200);
        }, 300);
        break;
      case "services":
        addMessage(tr.learnMore, "user");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage(tr.servicesInfo, "assistant", [
              {
                label: tr.bookMeeting,
                value: "schedule",
                icon: <Calendar className="w-4 h-4" />,
              },
            ]);
          }, 1200);
        }, 300);
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage(input, "user");
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);

        // Simple keyword matching for demo
        const lowerInput = input.toLowerCase();
        if (
          lowerInput.includes("schedule") ||
          lowerInput.includes("call") ||
          lowerInput.includes("meeting") ||
          lowerInput.includes("planifier") ||
          lowerInput.includes("appel") ||
          lowerInput.includes("réunion")
        ) {
          addMessage(tr.schedulingTitle, "assistant");
          setShowScheduler(true);
        } else if (
          lowerInput.includes("project") ||
          lowerInput.includes("work") ||
          lowerInput.includes("portfolio") ||
          lowerInput.includes("projet") ||
          lowerInput.includes("travail")
        ) {
          addMessage(tr.projectsInfo, "assistant", [
            {
              label: tr.scheduleCall,
              value: "schedule",
              icon: <Calendar className="w-4 h-4" />,
            },
          ]);
        } else if (
          lowerInput.includes("service") ||
          lowerInput.includes("offer") ||
          lowerInput.includes("help") ||
          lowerInput.includes("offre") ||
          lowerInput.includes("aider")
        ) {
          addMessage(tr.servicesInfo, "assistant", [
            {
              label: tr.scheduleCall,
              value: "schedule",
              icon: <Calendar className="w-4 h-4" />,
            },
          ]);
        } else {
          addMessage(tr.fallbackResponse, "assistant", [
            {
              label: tr.scheduleCall,
              value: "schedule",
              icon: <Calendar className="w-4 h-4" />,
            },
            {
              label: tr.askQuestion,
              value: "question",
              icon: <HelpCircle className="w-4 h-4" />,
            },
          ]);
        }
      }, 1500);
    }, 300);
  };

  const handleScheduleSubmit = async () => {
    if (
      !scheduleData.name ||
      !scheduleData.email ||
      !scheduleData.date ||
      !scheduleData.time
    ) {
      return;
    }

    try {
      // Save to database via the messages API
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          name: scheduleData.name,
          email: scheduleData.email,
          subject: `AI Scheduled Call: ${
            scheduleData.topic || "General Inquiry"
          }`,
          message: `Scheduled via AI Assistant\n\nTopic: ${
            scheduleData.topic || "General Inquiry"
          }\nPreferred Date: ${scheduleData.date}\nPreferred Time: ${
            scheduleData.time
          }`,
          wantsCall: true,
          preferredDate: scheduleData.date,
          preferredTime: scheduleData.time,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setShowScheduler(false);
        addMessage(tr.schedulingSuccess, "assistant", [
          {
            label: tr.askQuestion,
            value: "question",
            icon: <HelpCircle className="w-4 h-4" />,
          },
        ]);
        setScheduleData({ name: "", email: "", date: "", time: "", topic: "" });
      }
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[85%] ${
            isUser
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
              : "bg-muted rounded-2xl rounded-bl-md"
          } px-4 py-3`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.options && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickOption(option.value)}
                  className="text-xs h-8 bg-background/50 hover:bg-background"
                >
                  {option.icon}
                  <span className="ml-1">{option.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)]"
          >
            <Card className="w-full h-full flex flex-col shadow-2xl border-border/50 bg-background/95 backdrop-blur-sm">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{tr.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      {tr.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  {messages.map(renderMessage)}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Scheduler Form */}
                  {showScheduler && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-muted/50 rounded-xl p-4 mb-4 space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {tr.schedulingName}
                          </Label>
                          <Input
                            value={scheduleData.name}
                            onChange={(e) =>
                              setScheduleData({
                                ...scheduleData,
                                name: e.target.value,
                              })
                            }
                            className="h-9 text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {tr.schedulingEmail}
                          </Label>
                          <Input
                            type="email"
                            value={scheduleData.email}
                            onChange={(e) =>
                              setScheduleData({
                                ...scheduleData,
                                email: e.target.value,
                              })
                            }
                            className="h-9 text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tr.schedulingDate}
                          </Label>
                          <Input
                            type="date"
                            value={scheduleData.date}
                            onChange={(e) =>
                              setScheduleData({
                                ...scheduleData,
                                date: e.target.value,
                              })
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className="h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tr.schedulingTime}
                          </Label>
                          <select
                            value={scheduleData.time}
                            onChange={(e) =>
                              setScheduleData({
                                ...scheduleData,
                                time: e.target.value,
                              })
                            }
                            className="w-full h-9 text-sm rounded-md border bg-background px-3"
                          >
                            <option value="">Select time</option>
                            {tr.timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {tr.schedulingTopic}
                        </Label>
                        <Input
                          value={scheduleData.topic}
                          onChange={(e) =>
                            setScheduleData({
                              ...scheduleData,
                              topic: e.target.value,
                            })
                          }
                          className="h-9 text-sm"
                          placeholder="Project discussion..."
                        />
                      </div>
                      <Button
                        onClick={handleScheduleSubmit}
                        className="w-full h-9 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        disabled={
                          !scheduleData.name ||
                          !scheduleData.email ||
                          !scheduleData.date ||
                          !scheduleData.time
                        }
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {tr.schedulingSubmit}
                      </Button>
                    </motion.div>
                  )}

                  {/* Schedule Page Redirect */}
                  {showScheduleRedirect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <a
                        href="/schedule"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Calendar className="w-5 h-5" />
                        {tr.goToSchedule}
                        <Sparkles className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </ScrollArea>
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t bg-background/50">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={tr.placeholder}
                    className="flex-1 h-10"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
