"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DSACategory, DSATopic } from "@/data/dsa-topic-data";
import { 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  BrainCircuit, 
  Code2, 
  Layers, 
  Network,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DSACategorySidebarProps {
  categories: DSACategory[];
  activeTopicId: string;
  onSelectTopic: (topic: DSATopic) => void;
  completedTopicIds: string[];
}

export function DSACategorySidebar({
  categories,
  activeTopicId,
  onSelectTopic,
  completedTopicIds,
}: DSACategorySidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit": return BrainCircuit;
      case "Code2": return Code2;
      case "Layers": return Layers;
      case "Network": return Network;
      default: return BookOpen;
    }
  };

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    topics: cat.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.topics.length > 0);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      <div className="bg-card/90 backdrop-blur-md rounded-2xl border border-border p-4 shadow-sm space-y-4 sticky top-24">
        {/* Header & Search */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-sm text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span>DSA GFG Curriculum</span>
            </h3>
            <Badge variant="outline" className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              Top to Bottom
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topic or algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs h-9 bg-muted/40 border-border"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {filteredCategories.map((category) => {
            const Icon = getIcon(category.iconName);
            const categoryCompletedCount = category.topics.filter((t) =>
              completedTopicIds.includes(t.id)
            ).length;

            return (
              <div key={category.id} className="space-y-1.5">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase font-mono tracking-wider">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {categoryCompletedCount}/{category.topics.length}
                  </span>
                </div>

                <div className="space-y-1 pl-2 border-l-2 border-border/60 ml-2">
                  {category.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = completedTopicIds.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(topic)}
                        className={cn(
                          "w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs transition-all group",
                          isActive
                            ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
                            : "hover:bg-muted/60 text-muted-foreground hover:text-foreground font-medium"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {isDone ? (
                            <CheckCircle2 className={cn("h-3.5 w-3.5 shrink-0 text-emerald-500", isActive && "text-white")} />
                          ) : (
                            <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", isActive ? "bg-white" : "bg-muted-foreground/40")} />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>

                        {topic.visualizerType && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[9px] px-1 py-0 h-4 shrink-0 font-mono",
                              isActive
                                ? "bg-white/20 text-white border-white/40"
                                : "bg-primary/10 text-primary border-primary/20"
                            )}
                          >
                            Sim
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
