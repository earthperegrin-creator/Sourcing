import type { Company } from "../types/company";

/**
 * Phrases taken from company summaries and sector labels.
 * Longer phrases are applied first so a short token cannot cut a longer one.
 */
const GLOSSARY: [string, string][] = [
  ["垂直商品搜尋引擎", "vertical product search engine"],
  ["現金回饋", "cashback"],
  ["比價", "price comparison"],
  ["水下無人載具", "underwater unmanned vehicle"],
  ["水下科技", "underwater technology"],
  ["微波無線通訊", "microwave wireless communications"],
  ["航太認證", "aerospace-certified"],
  ["半導體晶圓廠", "semiconductor wafer fab"],
  ["智能大數據", "intelligent big-data"],
  ["數據分析", "data analysis"],
  ["數位解決方案", "digital solutions"],
  ["一站式會員經營平台", "one-stop membership platform"],
  ["顧客數據平台", "customer data platform"],
  ["客戶數據平台", "customer data platform"],
  ["自動化行銷", "marketing automation"],
  ["商業智慧", "business intelligence"],
  ["全CG動畫", "full-CG animation"],
  ["影視內容", "film and video"],
  ["影音簽名", "video signature"],
  ["電池管理系統", "battery management system"],
  ["客製化電池模組", "custom battery modules"],
  ["電動巴士", "electric buses"],
  ["儲能系統", "energy storage"],
  ["常壓電漿", "atmospheric plasma"],
  ["電漿化學氣相沈積", "plasma chemical vapor deposition"],
  ["電漿化學氣相沉積", "plasma chemical vapor deposition"],
  ["超臨界流體", "supercritical fluid"],
  ["超音波清洗", "ultrasonic cleaning"],
  ["專業清洗設備", "professional cleaning equipment"],
  ["萃取設備", "extraction equipment"],
  ["太陽能電池", "solar cells"],
  ["太陽能發電系統", "solar power systems"],
  ["太陽能發電", "solar power"],
  ["太陽光電系統", "solar PV systems"],
  ["太陽光電", "solar PV"],
  ["水面型太陽能", "floating solar"],
  ["再生能源", "renewable energy"],
  ["節能工程", "energy-saving engineering"],
  ["智慧能源管理", "smart energy management"],
  ["能源管理", "energy management"],
  ["資安檢測", "cybersecurity testing"],
  ["資訊安全", "cybersecurity"],
  ["資安", "cybersecurity"],
  ["會員經營", "membership operations"],
  ["顧客數據", "customer data"],
  ["預約服務", "booking"],
  ["行動裝置開發", "mobile development"],
  ["軟體開發", "software development"],
  ["系統整合", "systems integration"],
  ["教育訓練", "training"],
  ["創作者經紀", "creator management"],
  ["手機娛樂城", "mobile casino"],
  ["牌桌遊戲", "table games"],
  ["捕魚機", "fishing games"],
  ["老虎機", "slot machines"],
  ["漁電共生", "aquaculture paired with solar"],
  ["智慧養殖", "smart aquaculture"],
  ["水產養殖", "aquaculture"],
  ["數位人才培訓", "digital talent training"],
  ["雲端培訓", "cloud training"],
  ["區塊鏈旅宿", "blockchain hospitality"],
  ["旅宿管理", "hospitality management"],
  ["金融帳戶", "financial accounts"],
  ["客製化保養品", "custom skincare"],
  ["導電銀漿", "conductive silver paste"],
  ["金屬3D列印", "metal 3D printing"],
  ["金屬積層製造", "metal additive manufacturing"],
  ["雷射切割機", "laser cutter"],
  ["雷射雕刻", "laser engraving"],
  ["雷射設備", "laser equipment"],
  ["桌上雷射", "desktop laser"],
  ["手機檢測", "phone diagnostics"],
  ["先進封裝", "advanced packaging"],
  ["封裝材料", "packaging materials"],
  ["載板材料", "substrate materials"],
  ["增層膜", "build-up film"],
  ["虛擬資產金庫", "virtual-asset custody"],
  ["虛擬資產", "virtual assets"],
  ["加密貨幣金流", "crypto payment flows"],
  ["金流追蹤", "flow tracing"],
  ["數位取證", "digital forensics"],
  ["電子書服務", "ebook service"],
  ["電子書", "ebooks"],
  ["動物檢測", "animal diagnostics"],
  ["快篩試紙", "rapid tests"],
  ["動物用藥", "veterinary medicine"],
  ["寵物保健", "pet health products"],
  ["保健食品", "health supplements"],
  ["處方用藥", "prescription drugs"],
  ["口服用藥", "oral medicines"],
  ["鋁電池", "aluminum batteries"],
  ["碳權", "carbon credits"],
  ["快速充放電", "fast charge and discharge"],
  ["智慧回收機", "smart recycling machines"],
  ["光學辨識", "optical recognition"],
  ["自動分類", "automatic sorting"],
  ["電動機車", "electric scooters"],
  ["即時租借", "instant rental"],
  ["矽智財", "silicon IP"],
  ["設計服務", "design services"],
  ["標準單元庫", "standard cell library"],
  ["電子零件庫", "electronic parts library"],
  ["電子零件", "electronic parts"],
  ["表面聲波", "SAW"],
  ["半導體智能自動化", "semiconductor smart automation"],
  ["自動化系統", "automation systems"],
  ["綠電", "green power"],
  ["綠能", "green energy"],
  ["遊戲平台", "game platform"],
  ["網頁遊戲", "web games"],
  ["智慧建築", "smart buildings"],
  ["無人智取", "unattended pickup"],
  ["垂直農場", "vertical farm"],
  ["健康生技", "health biotech"],
  ["鍵管理", "key management"],
  ["行動電源", "power banks"],
  ["充電線", "charging cables"],
  ["充電器", "chargers"],
  ["集線器", "hubs"],
  ["筆電", "laptop"],
  ["智慧手機週邊", "smartphone accessories"],
  ["電腦周邊", "computer accessories"],
  ["語言指令集架構", "instruction-set architecture"],
  ["裝置端", "on-device"],
  ["推論", "inference"],
  ["指令集", "instruction set"],
  ["主要產品為", "products are"],
  ["主要產品", "main products"],
  ["主力產品", "main products"],
  ["主力開發", "mainly develops"],
  ["專注於", "focuses on"],
  ["致力於", "works on"],
  ["成立於", "founded in"],
  ["第一家", "the first"],
  ["解決方案", "solutions"],
  ["供應商", "supplier"],
  ["人工智慧", "AI"],
  ["大數據", "big data"],
  ["區塊鏈", "blockchain"],
  ["物聯網", "IoT"],
  ["深度學習", "deep learning"],
  ["雲端", "cloud"],
  ["平台", "platform"],
  ["軟體", "software"],
  ["硬體", "hardware"],
  ["服務", "services"],
  ["設備", "equipment"],
  ["製造", "manufacturing"],
  ["研發", "R&D"],
  ["設計", "design"],
  ["生產", "production"],
  ["銷售", "sales"],
  ["半導體", "semiconductor"],
  ["晶片", "chip"],
  ["電池", "battery"],
  ["儲能", "energy storage"],
  ["太陽能", "solar"],
  ["光電", "optoelectronics"],
  ["感測器", "sensors"],
  ["相機", "cameras"],
  ["影像", "imaging"],
  ["辨識", "recognition"],
  ["檢測", "inspection"],
  ["自動化", "automation"],
  ["機器人", "robotics"],
  ["衛星", "satellite"],
  ["雷達", "radar"],
  ["微波", "microwave"],
  ["通訊", "communications"],
  ["濾波器", "filters"],
  ["材料", "materials"],
  ["封裝", "packaging"],
  ["光學", "optical"],
  ["雷射", "laser"],
  ["清洗", "cleaning"],
  ["萃取", "extraction"],
  ["超音波", "ultrasonic"],
  ["電漿", "plasma"],
  ["農業", "agriculture"],
  ["養殖", "aquaculture"],
  ["醫療", "medical"],
  ["臨床", "clinical"],
  ["遊戲", "games"],
  ["廣告", "advertising"],
  ["網紅", "influencers"],
  ["能源", "energy"],
  ["環境", "environment"],
  ["健康", "health"],
  ["安全", "security"],
  ["分析", "analysis"],
  ["數據", "data"],
  ["智慧", "smart"],
  ["管理", "management"],
  ["系統", "systems"],
  ["技術", "technology"],
  ["產品", "products"],
  ["公司", "company"],
  ["企業", "enterprise"],
  ["客戶", "customers"],
  ["品牌", "brand"],
  ["市場", "market"],
  ["產業", "industry"],
  ["全球", "global"],
  ["台灣", "Taiwan"],
  ["提供", "offers"],
  ["開發", "develops"],
  ["專注", "focuses on"],
  ["包括", "includes"],
  ["整合", "integrates"],
  ["結合", "combines"],
  ["應用", "applications"],
  ["協助", "helps"],
  ["透過", "through"],
  ["以及", "and"],
  ["成立", "founded"],
  ["是", "is"],
  ["為", "for"],
  ["與", "and"],
  ["及", "and"],
  ["的", " "],
  ["在", "in"],
  ["以", "with"],
  ["是一家具有", "is a company with"],
  ["女裝", "women's clothing"],
  ["飾品", "accessories"],
  ["配件", "accessories"],
  ["包包", "bags"],
  ["彩妝", "cosmetics"],
  ["時尚", "fashion"],
  ["並", "and"],
  ["等", ""],
  ["最具潛力之", ""],
  ["一家", "a"],
  ["具有", "with"],
  ["生鮮", "fresh"],
  ["蔬果", "produce"],
  ["農產品", "agricultural products"],
  ["販售", "sells"],
  ["健康食品", "health food"],
  ["無毒", "pesticide-free"],
  ["智慧農場", "smart farm"],
  ["電池包", "battery packs"],
  ["客製化", "custom"],
  ["整車", "vehicle"],
  ["底盤", "chassis"],
  ["車隊", "fleet"],
  ["我們在做的產品服務", "products and services"],
  ["環保科技", "environmental technology"],
  ["循環系統", "circular systems"],
  ["循環經濟", "circular economy"],
  ["永續", "sustainable"],
  ["信號放大器", "signal boosters"],
  ["中繼站", "repeaters"],
  ["軟體無線電", "software-defined radio"],
  ["行動通訊", "mobile communications"],
  ["血糖試片", "blood glucose strips"],
  ["安全注射器", "safety syringes"],
  ["針筒", "syringes"],
  ["中草藥", "Chinese herbal medicine"],
  ["生技新藥", "biotech drugs"],
  ["生技", "biotech"],
  ["環境工程", "environmental engineering"],
  ["廢棄物", "waste"],
  ["廠區", "plant"],
  ["電商", "e-commerce"],
];

const GLOSSARY_SORTED = GLOSSARY.slice().sort((a, b) => b[0].length - a[0].length);

function glossText(input: string): string {
  let text = input;
  for (const [zh, en] of GLOSSARY_SORTED) {
    if (!text.includes(zh)) continue;
    text = text.split(zh).join(en ? ` ${en} ` : " ");
  }
  text = text.replace(/https?:\/\/\S+/g, " ");
  text = text.replace(/[\u4e00-\u9fff]/g, " ");
  text = text.replace(/[【】《》「」『』◆▲★●｜|]/g, " ");
  text = text.replace(/\s+/g, " ").trim();
  text = text.replace(/\s+([,.;:)])/g, "$1");
  text = text.replace(/([,.;:]){2,}/g, "$1");
  text = text.replace(/^[\s,;:.\-–—]+|[\s,;:\-–—]+$/g, "");
  return text;
}

function wordCount(text: string): number {
  return text.match(/[A-Za-z][A-Za-z0-9'+-]{2,}/g)?.length ?? 0;
}

function tidy(text: string): string {
  let sentence = text.replace(/[，、；]/g, ", ").replace(/：/g, ": ");
  sentence = sentence.replace(/\s+/g, " ").trim();
  sentence = sentence.replace(/\(\s*\)|（\s*）/g, "");
  sentence = sentence.replace(/\b(is|and|for|with|offers|in|of|the)\s+\1\b/gi, "$1");
  sentence = sentence.replace(/\s+,/g, ",").replace(/,\s*,+/g, ",").replace(/,\s*\./g, ".");
  sentence = sentence.replace(/^[\s,;:.\-–—]+|[\s,;:\-–—]+$/g, "");
  return sentence;
}

function oneSentence(text: string): string {
  let sentence = tidy(text);
  const pieces = sentence.split(/(?<=[A-Za-z)][.!?])\s+(?=[A-Z])/).filter(Boolean);
  sentence = pieces[0] ?? sentence;
  if (sentence.length > 320) sentence = sentence.slice(0, 317).replace(/\s+\S*$/, "");
  sentence = sentence.replace(/[,\s;:–-]+$/, "");
  if (!/[.!?]$/.test(sentence)) sentence += ".";
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function clampSentences(text: string, max: number): string {
  const parts = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
  if (parts.length <= max) return text.trim();
  return parts.slice(0, max).join(" ");
}

function expandDefinedTerms(line: string, summary: string): string {
  const defs: { acr: string; def: string }[] = [];
  const re = /([A-Z][A-Z0-9]{1,12})\s*[（(]\s*([^)）]{4,90})\s*[)）]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(summary))) {
    const def = match[2].trim();
    if (/[A-Za-z]{3}/.test(def)) defs.push({ acr: match[1], def });
  }
  let out = line;
  for (const { acr, def } of defs) {
    if (out.toLowerCase().includes(def.toLowerCase())) continue;
    const isa = new RegExp(`\\b${acr}\\s+ISA\\b`);
    if (isa.test(out) && /instruction set/i.test(def)) {
      out = out.replace(isa, `${acr}, ${def}`);
      continue;
    }
    const word = new RegExp(`\\b${acr}\\b`);
    if (word.test(out)) out = out.replace(word, `${acr}, ${def},`);
  }
  return out.replace(/,\s*,/g, ", ").replace(/\s+,/g, ",").replace(/,\s+/g, ", ");
}

function cleanEnglish(raw: string, summary: string): string {
  let text = raw.replace(/\s+/g, " ").trim();
  text = text.replace(/\bOur Product\s*&\s*Services\b/gi, "");
  text = text.replace(/\bProducts?\s*&\s*Services\b/gi, "");
  text = text.replace(/\s*【[^】]*$/g, "");
  text = text.replace(/\s*｜\s*\S*$/g, "");
  text = text.replace(/\s*[（(][一二三四五六七八九十0-9]+[)）]\s*$/g, "");
  text = text.replace(/\b[A-Z][A-Za-z]+'s product\b/g, "");
  text = expandDefinedTerms(text, summary);
  text = text.replace(/\s+\+\s+/g, " and ");
  text = text.replace(/\s{2,}/g, " ").trim();
  text = text.replace(/^[\s,;:.\-–—()）]+|[\s,;:\-–—]+$/g, "");
  return text;
}

function englishScore(part: string): number {
  const words = wordCount(part);
  const hasIp = /\bIP\b/.test(part);
  if (words < 4 && !hasIp) return 0;
  if (words < 5 && !hasIp) return 0;
  if (/excellence award/i.test(part) && words < 10) return 0;
  if (/^https?:/i.test(part.trim())) return 0;
  let score = words;
  if (/\b(IP|platform|software|system|camera|chip|sensor|inference|semiconductor|AI)\b/i.test(part)) score += 4;
  if (hasIp) score += 2;
  if (words >= 8) score += 3;
  if (words > 45) score -= 2;
  return score;
}

function leadingEnglish(summary: string): string | null {
  const cut = summary.search(/[\u4e00-\u9fff]{2,}/);
  const lead = (cut === -1 ? summary : summary.slice(0, cut)).replace(/https?:\/\/\S+/g, " ");
  const cleaned = cleanEnglish(lead, summary);
  if (wordCount(cleaned) >= 6 || (/\bIP\b/.test(cleaned) && wordCount(cleaned) >= 4)) return cleaned;
  return null;
}

function pureEnglishSpan(summary: string): string | null {
  const parts = summary.replace(/https?:\/\/\S+/g, " ").split(/[\u4e00-\u9fff]{2,}/);
  let best: string | null = null;
  let bestScore = 0;
  for (const part of parts) {
    const score = englishScore(part);
    if (score > bestScore) {
      bestScore = score;
      best = part;
    }
  }
  if (!best) return null;
  const cleaned = cleanEnglish(best, summary);
  if (wordCount(cleaned) < 8) return null;
  return cleaned;
}

function openingWindow(summary: string): string {
  let text = summary.replace(/\s+/g, " ").trim();
  const stops = ["公司願景", "公司簡介", "我們相信", "誠摯歡迎", "本公司", "我們深信"];
  for (const stop of stops) {
    const index = text.indexOf(stop);
    if (index > 24) text = text.slice(0, index);
  }
  const period = text.indexOf("。");
  if (period > 20) text = text.slice(0, period);
  const year = text.search(/\b20\d{2}\b/);
  if (year > 28) text = text.slice(0, year);
  if (text.length > 200) text = text.slice(0, 200);
  return text.trim();
}

function englishSector(sector: string | null): string | null {
  if (!sector) return null;
  const slash = sector.split("/").map((part) => part.trim());
  if (slash.length >= 2 && /[A-Za-z]{3}/.test(slash[1])) {
    return slash
      .slice(1)
      .join(" / ")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const parts = sector.split(/[,，]/).map((part) => part.trim()).filter(Boolean);
  const descriptive = parts.length > 1 ? parts.slice(1, 3).join(", ") : parts[0] ?? "";
  const glossed = glossText(descriptive);
  return wordCount(glossed) >= 1 ? glossed : null;
}

function descriptiveHook(hooks: string[]): string | null {
  for (const hook of hooks) {
    const wedge = hook.match(/^(?:tech wedge|wedge|domain fit)\s*:\s*(.+)$/i);
    if (wedge && wedge[1].trim().length > 20) return wedge[1].trim();
  }
  for (const hook of hooks) {
    const domain = hook.match(/^(?:core domain|physical\/HW pattern track)\s*\(([^)]+)\)/i);
    if (!domain) continue;
    const label = domain[1].replace(/_/g, " ");
    const rest = hook
      .replace(/^(?:core domain|physical\/HW pattern track)\s*\([^)]+\)\s*;?\s*/i, "")
      .replace(/\bshape_conf=[0-9.]+\s*;?\s*/gi, "")
      .replace(/\bhc[~=][^;]*;?\s*/gi, "")
      .replace(/\b\d+\s+open 104 roles;?\s*/gi, "")
      .replace(/[;\s]+$/g, "")
      .trim();
    if (rest.length > 12) return `${label}: ${rest}`;
  }
  return null;
}

function isChipDesignIp(text: string): boolean {
  if (/lpu\s*ip/.test(text)) return true;
  if (/矽智財|silicon ip|foundation ip/.test(text)) return true;
  if (/\bip\b/.test(text) && /chip|chips|semi|半導體|晶片|lpu|ic設計|isa\b|compiler\/hw-sw/.test(text)) return true;
  return false;
}

function isHardware(text: string, sector: string): boolean {
  if (/tech_services/i.test(sector) && !/camera|battery|laser|rov|sensor/.test(text)) return false;
  if (
    /相機|depth camera|電池模組|電池製造|雷射切割|laser cutter|laser engraving|\brov\b|回收機|銀漿|3d列印|載板|鍍膜設備|電漿設備|太陽能電池|saw device|行動電源|集線器|充電器|周邊設備|硬體/.test(
      text,
    )
  ) {
    return true;
  }
  if (/製造業|機械製造|零組件|電池製造|設備研發與製造/.test(sector) && !/食品/.test(sector)) return true;
  if (/machinery|materials & equipment/i.test(sector)) return true;
  return false;
}

function isSoftware(text: string, sector: string): boolean {
  if (/tech_services|internet & software/i.test(sector)) return true;
  if (/軟體|網際網路|互聯網|數位內容|遊戲、軟體|資訊服務/.test(sector)) return true;
  if (/\b(software|saas|platform)\b/.test(text)) return true;
  return false;
}

function isService(sector: string): boolean {
  return /服務業|廣告|公關|批發|經紀/.test(sector);
}

function fallbackKind(sector: string): string {
  if (/電影|媒體/.test(sector)) return "media";
  if (/廣告|公關/.test(sector)) return "service";
  if (/藥|醫|保健/.test(sector)) return "healthcare";
  if (/食品|農|養殖/.test(sector)) return "food";
  if (/能源|電力|光電/.test(sector)) return "energy";
  if (/半導體|IC設計|ic設計/.test(sector)) return "semiconductor";
  if (/軟體|網際|互聯網|資訊/.test(sector)) return "software";
  if (/製造|機械|設備|零組件/.test(sector)) return "hardware";
  if (/服務/.test(sector)) return "service";
  const english = englishSector(sector);
  if (english && english.length <= 32) return english.toLowerCase();
  return "other";
}

export function kindLabel(company: Pick<Company, "kind_plain" | "summary" | "sector" | "decision_hooks">): string {
  const given = company.kind_plain?.trim();
  if (given) return given;
  const blob = `${company.summary}\n${company.sector ?? ""}\n${company.decision_hooks.join("\n")}`.toLowerCase();
  const sector = company.sector ?? "";
  if (isChipDesignIp(blob)) return "chip design IP";
  if (isHardware(blob, sector)) return "hardware";
  if (isSoftware(blob, sector)) return "software";
  if (isService(sector)) return "service";
  return fallbackKind(sector);
}

export function whatItIs(company: Pick<Company, "what_it_is" | "summary" | "sector" | "decision_hooks">): string {
  const written = company.what_it_is?.replace(/\s+/g, " ").trim();
  if (written) return clampSentences(written, 2);

  const english = leadingEnglish(company.summary) ?? pureEnglishSpan(company.summary);
  if (english) return oneSentence(english);

  const glossed = tidy(glossText(openingWindow(company.summary)));
  const sectorLine = englishSector(company.sector);
  let sentence = glossed;
  if (wordCount(sentence) < 6 && sectorLine && !sentence.toLowerCase().includes(sectorLine.toLowerCase())) {
    sentence = [sentence, sectorLine].filter(Boolean).join(". ");
  }
  if (wordCount(sentence) >= 6) return oneSentence(sentence);

  const hook = descriptiveHook(company.decision_hooks);
  if (hook) return oneSentence(hook);
  if (wordCount(sentence) >= 3) return oneSentence(sentence);
  if (sectorLine) return oneSentence(sectorLine);
  return "No description in this record.";
}

function shortenHook(hook: string): string | null {
  const trimmed = hook.trim();
  if (!trimmed || /^website live=/i.test(trimmed) || /^domain_fit=/i.test(trimmed)) return null;

  let text = trimmed
    .replace(/^(?:tech wedge|domain fit|wedge)\s*:\s*/i, "")
    .replace(/\bshape_conf=[0-9.]+\s*;?\s*/gi, "")
    .replace(/\bhc[~=][^;]*;?\s*/gi, "")
    .replace(/\b\d+\s+open 104 roles;?\s*/gi, "")
    .replace(/^104 signal:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  const core = text.match(/^(core domain|physical\/HW pattern track)\s*\(([^)]+)\)\s*;?\s*(.*)$/i);
  if (core) {
    const label = core[1].toLowerCase().startsWith("core") ? "Core domain" : "Hardware track";
    const name = core[2].replace(/_/g, " ");
    const rest = core[3].replace(/^[\s;]+/, "").trim();
    text = rest ? `${label}: ${name}. ${rest}` : `${label}: ${name}.`;
  }

  text = text.replace(/^[\s;]+|[\s;]+$/g, "").trim();
  if (!text || /^open jobs=/i.test(text) || /^hc=/i.test(text)) return null;
  if (text.length > 118) text = `${text.slice(0, 115).replace(/\s+\S*$/, "")}…`;
  return text;
}

export function decisionHookLines(hooks: string[]): string[] {
  const lines = hooks.map(shortenHook).filter((line): line is string => Boolean(line));
  if (lines.length > 0) return lines.slice(0, 3);
  return hooks
    .map((hook) => hook.trim())
    .filter((hook) => hook.length > 0 && !/^website live=/i.test(hook))
    .slice(0, 3)
    .map((hook) => (hook.length > 118 ? `${hook.slice(0, 115).replace(/\s+\S*$/, "")}…` : hook));
}
