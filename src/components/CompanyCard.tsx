import { Globe, Landmark, Linkedin } from "lucide-react";
import { jobBoardMetrics } from "../lib/cardFacts";
import { decisionHookLines, kindLabel, whatItIs } from "../lib/plainCompany";
import { sourceLinksFor, type SourceKind } from "../lib/sourceLinks";
import type { Company } from "../types/company";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";

function SourceMark({ kind }: { kind: SourceKind }) {
  if (kind === "104") return <span className="font-mono text-[10px] font-semibold tracking-tight">104</span>;
  if (kind === "website") return <Globe className="size-3.5" strokeWidth={1.75} aria-hidden="true" />;
  if (kind === "linkedin") return <Linkedin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />;
  return <Landmark className="size-3.5" strokeWidth={1.75} aria-hidden="true" />;
}

function SourceLinks({ company }: { company: Company }) {
  const links = sourceLinksFor(company);
  if (links.length === 0) return null;

  return (
    <div className="flex shrink-0 items-center gap-1" aria-label="Company sources">
      {links.map((link) => (
        <a
          key={link.kind}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          title={link.label}
          data-source={link.kind}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-8")}
        >
          <SourceMark kind={link.kind} />
        </a>
      ))}
    </div>
  );
}

function Fact({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  const kind = kindLabel(company);
  const about = whatItIs(company);
  const hooks = decisionHookLines(company.decision_hooks);
  const metrics = jobBoardMetrics(company).filter((metric) => metric.id !== "hiring");
  const [headcount, jobs] = metrics;

  return (
    <Card aria-label={company.name} className="gap-0 rounded-xl py-0 shadow-sm">
      <CardHeader className="gap-3 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="min-w-0 text-xl leading-tight tracking-tight break-words">{company.name}</CardTitle>
          <SourceLinks company={company} />
        </div>
        <Badge variant="outline" data-kind={kind}>
          {kind}
        </Badge>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 py-3">
        <p className="text-sm leading-6 text-foreground" data-what-it-is>
          {about}
        </p>
      </CardContent>
      <Separator />
      <CardContent className="px-4 py-3">
        <p className="text-xs text-muted-foreground">104</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {headcount ? <Fact label="Headcount" value={headcount.value} hint={headcount.hint} /> : null}
          {jobs ? (
            <div className="border-l border-border pl-3">
              <Fact label="Open jobs" value={jobs.value} hint={jobs.hint} />
            </div>
          ) : null}
        </div>
      </CardContent>
      {hooks.length > 0 ? (
        <>
          <Separator />
          <CardContent className="px-4 py-3">
            <p className="text-xs text-muted-foreground">Decision hooks</p>
            <ul className="mt-2 space-y-2">
              {hooks.map((hook, index) => (
                <li key={`${index}-${hook.slice(0, 24)}`} className="text-sm leading-5 text-foreground">
                  {hook}
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      ) : null}
    </Card>
  );
}
