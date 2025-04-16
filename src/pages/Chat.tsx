
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { CheckCircle, ChevronDown, ClipboardCopy, DropletIcon, RefreshCw, SendIcon, ThumbsDown, ThumbsUp, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "thinking" | "complete";
}

const defaultPrompts = [
  "What's the water quality like in my area today?",
  "How do I interpret pH levels in drinking water?",
  "What contaminants should I be concerned about?",
  "Recommend a good water filter for my home",
  "Explain the relationship between temperature and dissolved oxygen",
  "What causes turbidity in water and how to fix it?",
  "How often should I test my well water?"
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AIQUA water quality assistant. How can I help you with water quality today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

    // Add thinking indicator
    const thinkingMessage: Message = {
      id: Date.now().toString() + "-thinking",
      content: "",
      sender: "bot",
      timestamp: new Date(),
      status: "thinking"
    };
    
    setMessages((prev) => [...prev, thinkingMessage]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => prev.filter(msg => msg.id !== thinkingMessage.id));
      
      const botResponses = [
        "Based on recent data, the water quality in your area is within acceptable parameters. The pH level is 7.2, turbidity is at 1.3 NTU, and dissolved oxygen is 8.1 mg/L, all of which are in the optimal range.",
        
        "pH is a measure of how acidic or basic water is, with a range from 0-14. For drinking water, the ideal pH range is between 6.5 and 8.5. Values below 6.5 indicate acidity and may cause corrosion of pipes, while values above 8.5 indicate alkalinity and may result in a bitter taste. If your water is outside this range, you might consider using a neutralizing filter.",
        
        "Common contaminants to watch for include: 1) Bacteria and viruses, 2) Heavy metals like lead and mercury, 3) Nitrates and nitrites from fertilizers, 4) Pesticides from agricultural runoff, 5) Chlorine byproducts, and 6) Arsenic that occurs naturally in ground water. Regular testing can help identify these contaminants before they become health risks.",
        
        "For a home filtration system, I'd recommend a multi-stage solution: 1) Start with a sediment pre-filter to remove particles, 2) Add an activated carbon filter for chemicals and odors, 3) Consider reverse osmosis for comprehensive filtration if you have specific concerns. Brands like Aquasana, Berkey, or APEC offer reliable systems in various price ranges. Would you like more specific recommendations based on your local water quality?",
        
        "Temperature and dissolved oxygen have an inverse relationship in water. As water temperature increases, its ability to hold dissolved oxygen decreases. This is why warm water bodies often have lower oxygen levels, which can stress aquatic life. Additionally, warmer water accelerates biological and chemical processes that consume oxygen, further reducing available dissolved oxygen for organisms.",
        
        "Turbidity is caused by suspended particles like silt, clay, algae, or organic matter in water. To reduce turbidity: 1) Install a sediment filter for your home water supply, 2) For drinking water, use a multi-stage filter with fine filtration, 3) If you have well water, check your well cap and casing for integrity to prevent surface contamination, 4) After heavy rains, allow water to settle before use if possible, as this is when turbidity is typically highest.",
        
        "For private well water, I recommend: 1) Annual testing for bacteria, nitrates, total dissolved solids, and pH, 2) Every 3-5 years for more comprehensive testing including heavy metals and pesticides, 3) Immediate testing if you notice changes in color, odor, or taste, 4) Additional testing after flooding, land disturbances near your well, or if your well is older. Your local health department may also offer specific guidelines for your area."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AIQUA water quality assistant. How can I help you with water quality today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Water Quality Assistant</h1>
          <p className="text-muted-foreground mt-1">
            Get expert guidance and answers about water quality
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1">
          <Card className="xl:col-span-3 flex flex-col h-[75vh]">
            <CardHeader className="px-4 py-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 bg-primary">
                  <DropletIcon className="h-5 w-5 text-primary-foreground" />
                </Avatar>
                <div>
                  <h3 className="font-semibold">AIQUA Assistant</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs rounded-full px-2 py-0 bg-green-50 text-green-600 border-green-200">Active</Badge>
                    <span className="ml-2">Water Quality Expert</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={handleClearChat}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid grid-cols-2 w-full rounded-none px-4 pt-2 pb-0 h-auto gap-2 bg-muted/50 border-b">
                  <TabsTrigger value="chat" className="rounded-b-none rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="rounded-b-none rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                    Water Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="h-full p-0 m-0">
                  <ScrollArea className="h-[calc(75vh-8rem)]" ref={scrollAreaRef}>
                    <div className="flex flex-col gap-4 px-4 py-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3 max-w-[85%]",
                            message.sender === "user" ? "self-end ml-auto" : "self-start"
                          )}
                        >
                          {message.sender === "bot" && (
                            <Avatar className="h-8 w-8 mt-1 bg-primary flex-shrink-0">
                              <DropletIcon className="h-4 w-4 text-primary-foreground" />
                            </Avatar>
                          )}
                          <div className="flex flex-col">
                            <div
                              className={cn(
                                "rounded-lg px-4 py-2.5 text-sm relative",
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}
                            >
                              {message.status === "thinking" ? (
                                <div className="flex gap-1 items-center h-6 px-2">
                                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.0s]"></div>
                                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]"></div>
                                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                              ) : (
                                message.content
                              )}
                            </div>
                            
                            {message.sender === "bot" && !message.status && (
                              <div className="flex gap-2 mt-1 ml-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyText(message.content)}>
                                  <ClipboardCopy className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          {message.sender === "user" && (
                            <Avatar className="h-8 w-8 mt-1 bg-secondary flex-shrink-0">
                              <UserCircle className="h-4 w-4 text-secondary-foreground" />
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="analysis" className="h-full p-4 m-0">
                  <div className="border rounded-lg p-4 h-full bg-muted/50 flex flex-col items-center justify-center">
                    <div className="text-center max-w-md">
                      <DropletIcon className="h-12 w-12 mx-auto text-primary opacity-50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Water Quality Analysis</h3>
                      <p className="text-muted-foreground mb-4">Upload your water quality data to get a comprehensive analysis and personalized recommendations.</p>
                      <Button variant="default">Upload Data</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="p-4 border-t bg-card">
              <div className="flex items-center w-full gap-2">
                <Input
                  placeholder="Ask about water quality..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={input.trim() === ""}
                >
                  <SendIcon className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-sm">Suggested Questions</h3>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex flex-col gap-2">
                  {defaultPrompts.map((prompt, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start h-auto py-2 px-3 text-left text-sm font-normal whitespace-normal"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-sm">Water Quality Tips</h3>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Test your water at least once annually for common contaminants</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Change water filters regularly according to manufacturer instructions</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Flush pipes after long periods of non-use by running cold water for 2-3 minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Store purified water in clean, sealed containers away from sunlight</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
