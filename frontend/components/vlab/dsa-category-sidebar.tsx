"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DSACategory, DSATopic } from "@/data/dsa-topic-data";
import { 
  CheckCircle2, 
  BookOpen, 
  BrainCircuit, 
  Code2, 
  Layers, 
  Network,
  Search,
  Cloud
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface DSACategorySidebarProps {
  categories: DSACategory[];
  activeTopicId: string;
  onSelectTopic: (topic: DSATopic) => void;
  completedTopicIds: string[];
  roadmapTitle?: string;
  className?: string;
}

export function DSACategorySidebar({
  categories,
  activeTopicId,
  onSelectTopic,
  completedTopicIds,
  roadmapTitle,
  className,
}: DSACategorySidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const firstCatId = categories[0]?.id || "";
  const headerTitle =
    roadmapTitle ||
    (firstCatId.startsWith("dbms-")
      ? "DBMS Curriculum Roadmap"
      : firstCatId.startsWith("c-prog-")
      ? "C Programming Roadmap"
      : firstCatId.startsWith("ml-")
      ? "ML Curriculum Roadmap"
      : firstCatId.startsWith("cloud-")
      ? "Cloud Service Management Roadmap"
      : "DSA Curriculum Roadmap");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit": return BrainCircuit;
      case "Code2": return Code2;
      case "Layers": return Layers;
      case "Network": return Network;
      case "Cloud": return Cloud;
      default: return BookOpen;
    }
  };

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    topics: cat.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.quickSummary || "").toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.topics.length > 0);

  return (
    <aside className={cn("w-full shrink-0", className)}>
      <div className="bg-card border border-border/80 rounded-none p-4 shadow-xs space-y-3.5 sticky top-24">
        {/* Header & Search */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-border/60">
            <h3 className="font-heading font-bold text-sm sm:text-base text-[#0284c7] dark:text-[#38bdf8] flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0284c7] dark:text-[#38bdf8]" />
              <span className="truncate">{headerTitle}</span>
            </h3>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topic or algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs h-9 bg-muted/30 border-border/80 rounded-none focus-visible:ring-1 focus-visible:ring-[#0284c7]/40"
            />
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-3.5 max-h-[420px] xl:max-h-[480px] overflow-y-auto pr-1">
          {filteredCategories.map((category) => {
            const Icon = getIcon(category.iconName);
            const categoryCompletedCount = category.topics.filter((t) =>
              completedTopicIds.includes(t.id)
            ).length;

            return (
              <div key={category.id} className="space-y-1.5">
                <div className="flex items-center justify-between px-1 py-1 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1.5 min-w-0 pr-2">
                    <Icon className="h-3.5 w-3.5 text-[#0284c7] dark:text-[#38bdf8] shrink-0" />
                    <span className="truncate font-sans">{category.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium bg-muted px-1.5 py-0.5 rounded-none text-muted-foreground shrink-0">
                    {categoryCompletedCount}/{category.topics.length}
                  </span>
                </div>

                <div className="space-y-1 pl-2 border-l-2 border-border/60 ml-1.5">
                  {category.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = completedTopicIds.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(topic)}
                        className={cn(
                          "w-full flex items-center justify-between text-left px-2.5 py-2 rounded-none text-xs transition-all cursor-pointer",
                          isActive
                            ? "text-[#ea580c] dark:text-[#f97316] font-bold bg-orange-500/10 dark:bg-orange-950/30 border-l-3 border-l-[#ea580c] pl-2.5"
                            : "text-[#0284c7] dark:text-[#38bdf8] hover:text-[#ea580c] hover:bg-muted/40 font-medium"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <span className={cn("h-1.5 w-1.5 shrink-0", isActive ? "bg-[#ea580c]" : "bg-muted-foreground/40")} />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>

                        {topic.visualizerType && (
                          <span
                            className={cn(
                              "text-[9px] px-1.5 py-0.2 rounded-none font-sans font-medium shrink-0 border",
                              isActive
                                ? "bg-orange-500/20 text-[#ea580c] border-orange-500/30"
                                : "bg-sky-500/10 text-[#0284c7] border-sky-500/20"
                            )}
                          >
                            Sim
                          </span>
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
