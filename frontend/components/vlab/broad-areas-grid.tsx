"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DISCIPLINES_DATA } from "@/data/labs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, BrainCircuit, Radio, Cloud, ShieldCheck, Database, ArrowRight, Box } from "lucide-react";

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Code2,
  BrainCircuit,
  Radio,
  Cloud,
  ShieldCheck,
  Database,
  Box,
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardMotionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function BroadAreasGrid() {
  return (
    <section className="py-14 bg-muted/20 border-b border-border/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="mb-2 text-xs uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
            Disciplines & Domains
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
            Broad Areas of Virtual Labs
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Explore dedicated virtual laboratories organized by engineering streams and specialized domains.
          </p>
        </div>

        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DISCIPLINES_DATA.map((discipline) => {
            const Icon = ICON_COMPONENTS[discipline.icon] || Box;

            return (
              <motion.div
                key={discipline.id}
                variants={cardMotionVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <Link href={`/labs?discipline=${discipline.id}`} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <Card className="h-full border-secondary/40 bg-card/60 backdrop-blur-xs hover:border-primary/50 transition-colors duration-200 shadow-xs hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${discipline.color} border border-border/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {discipline.labsCount} Labs Available
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold mt-3 group-hover:text-primary transition-colors">
                        {discipline.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-xs leading-relaxed line-clamp-2">
                        {discipline.description}
                      </CardDescription>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary pt-1">
                        <span>View Domain Labs</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
