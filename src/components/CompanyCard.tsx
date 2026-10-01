import { Globe, Landmark, Linkedin } from "lucide-react";
import { cardAbout, cardBullets, countOrNull } from "../lib/cardBrief";
import { kindLabel } from "../lib/plainCompany";
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

function FirstRead({ paragraph, evidence }: { paragraph: string; evidence: string[] }) {
  return (
    <>
      <Separator />
      <CardContent className="px-4 py-3">
        <section data-first-read className="rounded-lg border border-border bg-muted px-3 py-3">
          <h2 className="text-sm font-medium tracking-tight text-foreground">First Read</h2>
          <p className="mt-2 text-sm leading-6 break-words whitespace-normal text-foreground" data-first-read-body>
            {paragraph}
          </p>
          {evidence.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1.5 border-t border-border pt-3 pl-4">
              {evidence.map((item, index) => (
                <li
                  key={`${index}-${item}`}
                  data-first-read-evidence
                  className="text-sm leading-5 break-words whitespace-normal text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </CardContent>
    </>
  );
}

function BoardNumbers({ headcount, jobs }: { headcount: number | null; jobs: number | null }) {
  const tiles = [
    headcount != null ? { id: "headcount", label: "Headcount", value: String(headcount), hint: "people" } : null,
    jobs != null ? { id: "jobs", label: "Open jobs", value: String(jobs), hint: "posts" } : null,
  ].filter((tile): tile is { id: string; label: string; value: string; hint: string } => tile !== null);

  if (tiles.length === 0) return null;

  return (
    <>
      <Separator />
      <CardContent className="px-4 py-3">
        <p className="text-xs text-muted-foreground">104</p>
        <div className={cn("mt-2 grid gap-3", tiles.length > 1 && "grid-cols-2")}>
          {tiles.map((tile, index) => (
            <div
              key={tile.id}
              data-metric={tile.id}
              className={index > 0 ? "border-l border-border pl-3" : undefined}
            >
              <Fact label={tile.label} value={tile.value} hint={tile.hint} />
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  const kind = company.kind_plain?.trim() || kindLabel(company);
  const stage = company.stage?.trim() ?? "";
  const about = cardAbout(company);
  const bullets = cardBullets(company, about);
  const headcount = countOrNull(company.headcount_104_num);
  const jobs = countOrNull(company.open_jobs_104_num);
  const firstRead = company.first_read?.trim() ?? "";

  return (
    <Card aria-label={company.name} className="gap-0 rounded-xl py-0 shadow-sm">
      <CardHeader className="gap-3 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="min-w-0 text-xl leading-tight tracking-tight break-words">{company.name}</CardTitle>
          <SourceLinks company={company} />
        </div>
        {kind || stage ? (
          <div className="flex flex-wrap items-center gap-2">
            {kind ? (
              <Badge variant="outline" data-kind={kind} className="h-auto max-w-full overflow-visible whitespace-normal text-left">
                {kind}
              </Badge>
            ) : null}
            {stage ? (
              <Badge variant="outline" data-stage={stage} className="h-auto max-w-full overflow-visible whitespace-normal text-left">
                {stage}
              </Badge>
            ) : null}
          </div>
        ) : null}
      </CardHeader>
      {firstRead ? (
        <FirstRead
          paragraph={firstRead}
          evidence={Array.isArray(company.first_read_evidence) ? company.first_read_evidence : []}
        />
      ) : null}
      <Separator />
      <CardContent className="px-4 py-3">
        <p className="text-sm leading-6 break-words whitespace-normal text-foreground" data-what-it-is>
          {about}
        </p>
      </CardContent>
      <BoardNumbers headcount={headcount} jobs={jobs} />
      {bullets.length > 0 ? (
        <>
          <Separator />
          <CardContent className="px-4 py-3">
            <ul className="list-disc space-y-2 pl-4">
              {bullets.map((bullet, index) => (
                <li
                  key={`${bullet.label ?? "hook"}-${index}`}
                  data-bullet={bullet.label ?? "hook"}
                  className="text-sm leading-5 break-words whitespace-normal text-foreground"
                >
                  {bullet.label ? <span className="text-muted-foreground">{bullet.label}. </span> : null}
                  {bullet.text}
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      ) : null}
    </Card>
  );
}
