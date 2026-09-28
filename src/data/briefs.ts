/** Scan copy compressed from companies.json. No figures beyond that seed. */

export interface DecisionBrief {
  summary: string[];
  fundraising: string[];
  team: string[];
  why: string[];
  hooks: string[];
}

const notDisclosed = "Not disclosed in this record.";
const noNames = "No founder names in the seed.";

export const briefs: Record<string, DecisionBrief> = {
  "tw-54309531": {
    summary: [
      "Edge and on-device GenAI: LPU IP plus the LISA instruction set.",
      "EdgeThought: single-core LPU for on-device LLM inference.",
      "HyperThought: multi-core LPU for multimodal and agentic AI, including on-premise.",
      "LISA v3: in-house ISA with multiple data types.",
      "Seed also lists a cloud-optimized software compiler R&D plan.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Core thesis hit: small and on-device models, plus agentic.",
      "Called the strongest fit in the screened 100.",
      "Dig-15 lean: Yes. Reachout shortlist, enrich rank #33.",
    ],
    hooks: [
      "Wedge: LPU IP and a compiler / HW-SW stack for local LLM and agentic inference.",
      "Headcount is withheld, so the 6 open jobs have no company size beside them.",
      "Capital is withheld. Raise, stage, and founders are unknown.",
      "The product split is IP (EdgeThought, HyperThought, LISA), not an end-user app.",
    ],
  },
  "tw-50777028": {
    summary: [
      "AI vision localization and navigation for autonomous vehicles.",
      "Anti-jamming and anti-spoofing sit in the same stack.",
      "Lightweight map-feature perception and mapping, using deep learning and computer vision.",
      "Stated aim: a full visual localization and navigation solution for unmanned vehicles.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Physical-industry AI with real computer-vision hiring.",
      "Lean note names Sr AI CV and map-infra roles.",
      "Called a clear tech product.",
      "Dig-15 lean: Yes. Reachout shortlist, enrich rank #11.",
    ],
    hooks: [
      "Wedge: AV localization and the map pipeline.",
      "Latest 104 title is cut off at “Sr./Principal AI Com”. Lean note reads it as Sr AI CV.",
      "104 capital is in the signals. Round history is not.",
      "Founder names are not in this record.",
    ],
  },
  "tw-24698626": {
    summary: [
      "Edge AI vision and audio algorithms and IP, packaged for chips.",
      "Blurb names Qualcomm, Ambarella, and MediaTek as partners.",
      "Products listed: AI image-recognition suite, edge image-algorithm IP, image-management suite.",
      "Also listed: a connected-vehicle radar-plus-image fusion camera (note dated 110.10).",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Edge AI IP fits the on-device thesis.",
      "Open jobs are low (2). Lean note calls activity weak and says to dig product depth.",
      "Dig-15 lean: Yes. Reachout shortlist, enrich rank #14.",
    ],
    hooks: [
      "Wedge: vision and audio IP for cameras, auto, and care.",
      "Chip-partner names come from the company blurb.",
      "Two open jobs is the weak-activity flag.",
      "Founders and round history are not in this record.",
    ],
  },
  "tw-45886200": {
    summary: [
      "WinHub.AI: fusion platform from Edge to Agent, no-code AI deployment.",
      "Pieces named: vision, AutoML, expert systems, and AIWinOps image-recognition training.",
      "Verticals in the blurb: semiconductor, water, and NDT.",
      "Also listed: deep-learning front-camera recognition for ADAS.",
      "Offers project or subscription delivery. Claims landed cases; count and names are not given.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Edge-to-agent framing matches the agentic thesis.",
      "Website check returned error. Resolve that before trusting the site.",
      "Dig-15 lean: Yes. Shortlist tier is possible, enrich rank #82.",
    ],
    hooks: [
      "Wedge: edge AI ops for physical-industry deployment.",
      "Website check = error is the first dig.",
      "Headcount is withheld. 104 capital is 2100萬元.",
      "“Landed cases” is a company claim without names or a count.",
    ],
  },
  "tw-55971922": {
    summary: [
      "Keyper: zero-trust passwordless platform.",
      "Stack in the blurb: security keys, PKI, MFA, and biometrics, used with a chip.",
      "Smart Token research and product plan is listed.",
      "Describes itself as an identity and cybersecurity vendor.",
    ],
    fundraising: [
      "Lean note names Chunghwa Investment, 2024.",
      "Amount, round, and role are not in this record.",
    ],
    team: [notDisclosed, noNames],
    why: [
      "On the cyber landscape map.",
      "Chunghwa Investment 2024 is the named capital note.",
      "Stays Maybe: identity is called crowded, not an auto-Yes.",
      "Dig-15 lean: Maybe. Reachout shortlist, enrich rank #19.",
    ],
    hooks: [
      "Wedge: identity and zero-trust.",
      "Latest 104 post is a domestic sales role.",
      "Crowded identity is why the lean is Maybe.",
      "Terms around Chunghwa Investment are not in the record.",
    ],
  },
  "tw-45074293": {
    summary: [
      "Energy IoT: LPWAN (Weightless) and AMI smart-meter communications.",
      "Also builds microgrid management: devices, comms, energy software, and cloud.",
      "Positioned for utility AMI and for factory energy cost and usage.",
      "Separate listing: long-range low-power wireless e-paper for smart factories.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Physical-industry connectivity plus energy software.",
      "Lean note cites an international footprint. Countries are not listed.",
      "Pattern-recognition Maybe.",
      "Dig-15 lean: Maybe. Reachout shortlist, enrich rank #2.",
    ],
    hooks: [
      "Wedge: utility and industrial IoT connectivity.",
      "Largest structured 104 headcount in this twenty: 150, with 19 open jobs.",
      "International footprint is asserted without a market list.",
      "Founders and venture rounds are not in this record.",
    ],
  },
  "tw-52809996": {
    summary: [
      "Flow AOI and an AI particle imager for liquid micro-contamination in advanced manufacturing.",
      "Product: LEADquid 800 Series. AI analysis, particle size, morphology, process monitoring.",
      "Measurement services sit alongside the instrument.",
      "Blurb says expansion covers Japan, the US, Europe, and Asia.",
      "Listed plan: R2R continuous foreign-matter monitoring.",
    ],
    fundraising: [notDisclosed],
    team: ["ITRI spin-out, from the lean note.", noNames],
    why: [
      "ITRI spin-out.",
      "AI plus industrial metrology. A physical-AI pattern.",
      "Dig-15 lean: Maybe. Shortlist tier possible, enrich rank #57.",
    ],
    hooks: [
      "Wedge: fluid AOI for process contamination.",
      "Customer logos and revenue are not in the seed.",
      "104 capital is withheld.",
      "Expansion markets are named. Local proof of those offices is not.",
    ],
  },
  "tw-55936524": {
    summary: [
      "SCM memory controllers and PCIe/CXL IP for AI PC and datacenter memory bottlenecks.",
      "SCM controller targets the gap between DRAM and NAND flash.",
      "Concepts named: CXL Native Memory, NVMe-over-CXL, CXL Persistent Memory, plus HBM, switch, and chiplet.",
      "Blurb: CXL work listed by the alliance and on a Xilinx vendor list.",
      "PCIe/CXL FPGA platform passed PCI-SIG compliance in February 2023.",
    ],
    fundraising: ["Lean note mentions a B-round.", "Amount, date, and lead are not in this record."],
    team: ["Lean note: San Francisco and Hsinchu IC team.", noNames],
    why: [
      "AI infrastructure memory layer.",
      "Lean note: SF and Hsinchu IC team, and a B-round.",
      "Chip lane is called limited personal power, so the lean is Maybe.",
      "Dig-15 lean: Maybe. Shortlist tier possible, enrich rank #78.",
    ],
    hooks: [
      "Wedge: CXL and persistent memory for AI systems.",
      "Dated proof in the blurb: PCI-SIG compliance, February 2023.",
      "B-round is mentioned without size, date, or lead.",
      "Maybe here is about reach on a chip deal, not a blank product.",
    ],
  },
  "tw-54058540": {
    summary: [
      "3D depth cameras: time-of-flight, stereo, and structured light, plus middleware and an SDK.",
      "Uses named: surveillance, ADAS, drone, AR/VR/MR, robot, and 3D scan.",
      "In-house work spans optics, electrical, mechanical, compute, algorithms, and AI.",
      "Blurb says the cameras are patented and the algorithms are in-house.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Real depth-sensing stack.",
      "Website check returned error. Dig the site, then decide.",
      "Dig-15 lean: Maybe. Reachout shortlist, enrich rank #29.",
    ],
    hooks: [
      "Wedge: physical-world perception, hardware plus software.",
      "104 capital is 10億. Headcount on 104 is 87. No round history in the seed.",
      "Website check = error.",
      "No founder names in the seed.",
    ],
  },
  "tw-59244517": {
    summary: [
      "AiHealth platform and HealthGPT, a generative personal health assistant.",
      "Buyers in the blurb: end users and the health industry.",
      "Phase named: data foundation and AI imaging diagnosis.",
      "Also listed: live sports motion-sync analysis.",
      "Claims international innovation awards and expansion to multiple markets. Names are not given.",
    ],
    fundraising: [notDisclosed],
    team: ["NTU-founded, from the lean note.", noNames],
    why: [
      "Digital health engagement is in scope.",
      "Open question in the note: ops product versus a pure chatbot.",
      "NTU-founded.",
      "Dig-15 lean: Maybe. Shortlist tier possible, enrich rank #53.",
    ],
    hooks: [
      "Wedge: health engagement and industry workflow, not a disease-treatment algorithm.",
      "Awards and overseas markets are claims without names.",
      "104 scale is small: 20 people, capital 2680萬元.",
      "Founder names are not in the seed.",
    ],
  },
  "tw-52557921": {
    summary: [
      "Smart poultry monitoring: industrial IoT, gas sensors, and AI flock management.",
      "Blurb: founded in Berkeley, California, with a US-style management culture.",
      "Technologies named: AI, biotech, and IoT, aimed at international markets.",
      "The company blurb in the seed is truncated.",
    ],
    fundraising: [notDisclosed],
    team: ["Founded in Berkeley, per the company blurb.", noNames],
    why: [
      "Physical AI in agriculture.",
      "US-style startup DNA is the team note.",
      "Open dig from the lean note: product versus sensors-only.",
      "Dig-15 lean: Maybe. Reachout shortlist, enrich rank #15.",
    ],
    hooks: [
      "Wedge: agritech sensing plus operations.",
      "Latest 104 post is a senior finance role. The title is truncated.",
      "Four open jobs on 39 people.",
      "The seed blurb cuts off, so the product write-up is incomplete.",
    ],
  },
  "tw-54555786": {
    summary: [
      "IoT and product security: X.509 and a chip-security cloud, plus AI brands.",
      "Blurb: BenQ/Qisda group member.",
      "Offering count stated: three brands, three product-security solutions, one AI service. Brand names are not listed.",
      "Named product: 芯安雲, a chip-production cloud described as low-cost, high-security, and fast to onboard.",
    ],
    fundraising: ["Not disclosed. 104 capital is a separate registry figure (see signals)."],
    team: ["Blurb: BenQ/Qisda group member.", noNames],
    why: [
      "Cyber map: IoT and device PKI.",
      "Group subsidiary. Lean note says that dampens the angel shape.",
      "Website check returned error.",
      "Dig-15 lean: Maybe. Reachout shortlist, enrich rank #18.",
    ],
    hooks: [
      "Wedge: device PKI and product security.",
      "BenQ/Qisda is the shape caveat.",
      "21 open jobs on 30 people. The traction line names no roles.",
      "Website check = error.",
    ],
  },
  "tw-54166891": {
    summary: [
      "AI acute kidney injury (AKI) prediction assist software.",
      "AI acute respiratory distress (ARDS) detection assist software.",
      "Clinical care management system, plus a respiratory-care pilot.",
      "Treatment-domain clinical AI next to an operations system.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Screening note: treatment-domain AI is Maybe at best (Miraka-class).",
      "The diggable wedge in that note is the clinical ops system.",
      "Dig-15 lean: Maybe. Shortlist tier possible, enrich rank #59.",
    ],
    hooks: [
      "Wedge: clinical decision support, with treatment-domain depth risk.",
      "Care-management system is the part the note says to dig.",
      "Latest 104 post is an FAE.",
      "No clinical evidence metrics, founders, or round in the seed.",
    ],
  },
  "tw-50791576": {
    summary: [
      "Two brands: Otoadd for AI hearing, ThunderFortis for AI thermal and night-vision optics.",
      "Otoadd: medical-grade hearing aids and pro headphones, with AI voice boost and Bluetooth.",
      "ThunderFortis: augmented-reality and sighting devices combining thermal and night vision.",
      "Also listed: a smart assistive-hearing earphone module.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "On-device AI hardware.",
      "Pass-curious until a product dig.",
      "Dig-15 lean: Pass-curious. Reachout shortlist, enrich rank #6.",
    ],
    hooks: [
      "Wedge: edge AI audio plus vision hardware, assistive and sighting optics.",
      "English name was scraped as Facebook. Ignore that. Use RelaJet / Otoadd.",
      "20 open jobs on 45 people.",
      "Founders and round history are not in the seed.",
    ],
  },
  "tw-53117628": {
    summary: [
      "Precision agriculture and a carbon-reduction cloud.",
      "Stack: GIS and spatial AI, plus IoT sensors, for environment and farm management.",
      "Blurb: industry-academia transfer for precision smart agriculture.",
      "The seed summary is short and repeats itself.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Physical-AI pattern: GIS plus agriculture and environment.",
      "An English scrape labeled this company “IoT”. Use EMCT.",
      "Dig-15 lean: Maybe. Shortlist tier possible, enrich rank #73.",
    ],
    hooks: [
      "Wedge: GIS and AI for agriculture and the environment.",
      "Lean note says small hiring (3). Structured 104 open jobs are 2.",
      "104 capital is 2000萬元.",
      "Founders, revenue, and customer names are not in the seed.",
    ],
  },
  "tw-45137635": {
    summary: [
      "Vertical product search and price comparison, with cashback. Blurb legal name: 樂方.",
      "Blurb: 3 billion product listings, and cashback with 100+ e-commerce partners.",
      "13 regions and 11 languages.",
      "2020 claim: largest price-comparison site by traffic in Taiwan and Southeast Asia.",
      "Monthly uniques stated as 35,000,000.",
    ],
    fundraising: [
      "2017: invited into SOSV’s MOX accelerator. Blurb says the first Taiwan team there.",
      "2019: A-round first close of US$5 million.",
      "Later closes, lead, and total raised are not in this record.",
    ],
    team: [notDisclosed, noNames],
    why: [
      "Commerce search with a disclosed financing step.",
      "SOSV MOX alum, with the 2017 invite and the 2019 A-round step in the blurb.",
      "domain_fit=core (tech services). Reachout score 7.6. Not a Dig-15 screen.",
    ],
    hooks: [
      "35,000,000 monthly uniques and 3 billion listings are company-stated.",
      "The US$5 million figure is the Series A first close only.",
      "Structured 104 headcount is empty. Traction says ~45.",
      "Named open roles are business development.",
    ],
  },
  "tw-53985400": {
    summary: [
      "芳興科技. Microwave and millimeter-wave hardware: AESA and radar, active and passive.",
      "Certifications in the blurb: ISO 9001 and AS9100D.",
      "Space: self-developed 3U cubesat named TORO (信天翁).",
      "Ocean: AIS plus NOAA, satellite ocean-color monitoring, and an AI fishing-hotspot forecast.",
      "Partners named in the blurb: 國家太空中心, ITRI, and unnamed industrial groups.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Physical communications: AESA, radar, and an aerospace certification.",
      "domain_fit=core (telecom). Reachout score 7.6.",
      "Reachout extra, not a Dig-15 screen.",
    ],
    hooks: [
      "Three lines in one blurb: radar hardware, a cubesat, and ocean AI.",
      "Latest named 104 post is general affairs. Engineer roles are also listed.",
      "National-partner and cubesat claims are in the company blurb.",
      "Fundraising is not disclosed. 104 capital is 5億.",
    ],
  },
  "tw-55792076": {
    summary: [
      "昱峰智能 / AIBDT: decision analytics for semiconductor wafer fabs.",
      "Blurb: 24 years of fab data-analysis experience, and 15+ years in decision analytics.",
      "Team span listed: process, yield, capacity, product design, AI, big data, and IT.",
      "Product: an intelligent-analysis big-data platform.",
      "Company claims: fab impact of 百億以上, and a “NO.1” algorithm, compute, and data stack.",
    ],
    fundraising: [notDisclosed],
    team: [
      "Blurb describes a cross-functional fab team. Names are not given.",
      "The 24-year and 15-year figures are company-stated.",
    ],
    why: [
      "Semiconductor process and yield analytics.",
      "domain_fit=core (tech services). Reachout score 7.24.",
      "Reachout extra, not a Dig-15 screen.",
    ],
    hooks: [
      "Wedge: wafer-fab decision analytics.",
      "百億以上 and “NO.1” are company claims in the blurb.",
      "Structured 104 headcount is empty. Traction says ~36.",
      "Hiring-activity field is empty. Traction has no resume line.",
    ],
  },
  "tw-50761068": {
    summary: [
      "AI for pharma, e-commerce, and enterprise operations.",
      "Pharma line: clinic, pharma, and patient information flow, plus market insight and customer tiers.",
      "A smart drug-ordering platform is mentioned. The name is cut off at “Dr.” in the seed.",
      "HCP line: pharma HCP solution with Veeva and IQVIA integration modules.",
      "Blurb says the company passed ISO 27001.",
    ],
    fundraising: [notDisclosed],
    team: [notDisclosed, noNames],
    why: [
      "Software company with a healthcare commercial angle.",
      "Buyers named span pharma, e-commerce, and enterprise.",
      "domain_fit=core. Reachout score 7.4. Not a Dig-15 screen.",
    ],
    hooks: [
      "Wedge: pharma HCP workflows, with Veeva and IQVIA modules named.",
      "Commercial workflow AI in the blurb, not a clinical prediction model.",
      "Open roles named: AI project manager, AI application engineer, AI intern.",
      "104 capital is withheld. Structured headcount is empty. Traction says ~60.",
    ],
  },
  "tw-53821977": {
    summary: [
      "玉豐海洋科儀. Underwater ROV and subsea accessories. Blurb says the first such supplier in Taiwan.",
      "Services: underwater survey, emergency rescue, aquaculture, and offshore-wind support.",
      "Products: ROV, underwater connectors and components, and offshore-wind job support.",
    ],
    fundraising: [notDisclosed],
    team: ["HQ Taichung, a Taipei office, and a joint venture with Acteon.", noNames],
    why: [
      "Physical-world robotics: ROV and underwater vehicles.",
      "domain_fit=physical_or_hw (machinery). Reachout score 7.0.",
      "Reachout extra, not a Dig-15 screen.",
    ],
    hooks: [
      "Wedge: subsea hardware and services, including offshore wind.",
      "Acteon joint venture is the named corporate tie.",
      "“First in Taiwan” is a company claim.",
      "Named open roles: finance, internal audit, and an R&D project manager.",
      "Structured headcount is empty. Traction says ~90.",
    ],
  },
};

export function briefFor(slug: string): DecisionBrief | null {
  return briefs[slug] ?? null;
}

export function assertBriefsCover(slugs: string[]): void {
  const missing = slugs.filter((slug) => !briefs[slug]);
  const extra = Object.keys(briefs).filter((slug) => !slugs.includes(slug));
  if (missing.length > 0 || extra.length > 0) {
    throw new Error(`Brief mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
  }
}
