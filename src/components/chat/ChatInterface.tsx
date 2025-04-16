
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, DropletIcon, RefreshCwIcon, UserCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AIQUA water quality assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Your water quality is within normal parameters today. No contaminants detected.",
        "I've analyzed the recent data and noticed a slight increase in turbidity in the north sector. This is still within acceptable ranges, but I'll continue monitoring.",
        "Based on current weather patterns and historical data, I predict excellent water quality for the next 48 hours.",
        "The latest IoT sensor readings show pH levels of 7.2, turbidity of 1.3 NTU, and dissolved oxygen at 8.5 mg/L. All parameters are in the optimal range.",
        "I've detected a minor chlorine level fluctuation, but it's still well within safe limits. No action required at this time."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full border shadow-sm">
      <CardHeader className="px-4 py-3 border-b flex justify-between items-center bg-primary/5">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary">
            <DropletIcon className="h-4 w-4 text-primary-foreground" />
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">AIQUA Assistant</h3>
            <p className="text-xs text-muted-foreground">Water Quality Expert</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full py-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4 px-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[80%]",
                  message.sender === "user" ? "self-end ml-auto" : "self-start"
                )}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 bg-primary flex-shrink-0">
                    <DropletIcon className="h-4 w-4 text-primary-foreground" />
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-secondary flex-shrink-0">
                    <UserCircleIcon className="h-4 w-4 text-secondary-foreground" />
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 max-w-[80%] self-start">
                <Avatar className="h-8 w-8 bg-primary flex-shrink-0">
                  <DropletIcon className="h-4 w-4 text-primary-foreground" />
                </Avatar>
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.0s]"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t bg-card">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Ask about water quality..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={input.trim() === ""}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
