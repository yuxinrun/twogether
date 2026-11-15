import * as React from "react";

// 原创 SVG 插画组件库。统一线条风格，使用品牌色：
// 陶土色 #B9775B / 鼠尾草绿 #879889 / 暖白 #FAF8F4 / 浅棕 #D2A088 / 深字 #34312E
// 所有插画支持 className 控制尺寸，并带有可访问性描述。

type IllProps = { className?: string; title?: string };

function Frame({
  children,
  title,
  className,
  vb = "0 0 320 240",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  vb?: string;
}) {
  return (
    <svg
      viewBox={vb}
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

const T = "#B9775B";
const Tl = "#D2A088";
const S = "#879889";
const Sl = "#A7B3A8";
const INK = "#34312E";
const MUT = "#827D75";

export function HeroIllustration({ className, title = "两个人围桌交流" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <rect x="24" y="150" width="272" height="14" rx="7" fill="#F0ECE5" />
      <rect x="40" y="164" width="240" height="60" rx="10" fill="#E7E0D5" />
      {/* plant */}
      <path d="M250 150c0-18 6-30 14-38" stroke={S} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M264 112c10 4 16 12 16 22" stroke={Sl} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M250 120c-9 2-15 9-15 18" stroke={Sl} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="246" y="138" width="34" height="14" rx="4" fill={Tl} />
      {/* book stack */}
      <rect x="48" y="128" width="46" height="10" rx="3" fill={T} />
      <rect x="54" y="118" width="40" height="10" rx="3" fill={S} />
      <rect x="50" y="108" width="44" height="10" rx="3" fill={Tl} />
      {/* two people */}
      <g>
        <circle cx="120" cy="96" r="20" fill={T} />
        <path d="M96 158c0-22 11-36 24-36s24 14 24 36" fill={Tl} />
      </g>
      <g>
        <circle cx="196" cy="96" r="20" fill={S} />
        <path d="M172 158c0-22 11-36 24-36s24 14 24 36" fill={Sl} />
      </g>
      {/* tea cups */}
      <path d="M150 150h8v-8a4 4 0 00-8 0z" fill="#fff" stroke={MUT} strokeWidth="1.5" />
      <path d="M186 150h8v-8a4 4 0 00-8 0z" fill="#fff" stroke={MUT} strokeWidth="1.5" />
      {/* speech */}
      <path d="M140 78c8-10 22-10 30 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M178 78c-8-10-22-10-30 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export function MarriageGrowth({ className, title = "共同成长" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M160 200V120" stroke={S} strokeWidth="4" strokeLinecap="round" />
      <path d="M160 150c-20-6-34-22-34-44 22 0 34 14 34 30" fill={Sl} />
      <path d="M160 138c20-6 34-22 34-44-22 0-34 14-34 30" fill={S} />
      <circle cx="160" cy="108" r="12" fill={T} />
      <circle cx="120" cy="190" r="16" fill={Tl} />
      <circle cx="200" cy="190" r="16" fill={Sl} />
    </Frame>
  );
}

export function ActiveListening({ className, title = "认真倾听" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <circle cx="110" cy="120" r="34" fill={Tl} />
      <circle cx="110" cy="100" r="16" fill={T} />
      <path d="M168 96c0 0 26 6 26 34s-26 34-26 34" stroke={S} strokeWidth="4" fill="none" />
      <circle cx="206" cy="130" r="6" fill={S} />
      <path d="M150 120h44" stroke={S} strokeWidth="4" strokeLinecap="round" />
      <path d="M168 150l10 14 18-26" stroke={S} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function ConflictResolution({ className, title = "冲突修复" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M70 70l60 60M130 70l-60 60" stroke={Tl} strokeWidth="5" strokeLinecap="round" />
      <path d="M190 160c14-30 14-60 0-90" stroke={S} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M250 160c-14-30-14-60 0-90" stroke={Sl} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M210 85l16 16 28-30" stroke={T} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function EmotionalConnection({ className, title = "情感连接" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M90 140c0-26 14-46 40-46s40 20 40 46" fill={Tl} />
      <path d="M230 140c0-26-14-46-40-46s-40 20-40 46" fill={Sl} />
      <path d="M130 110c14 14 46 14 60 0" stroke={T} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="120" r="6" fill={T} />
      <circle cx="170" cy="120" r="6" fill={T} />
    </Frame>
  );
}

export function TrustRespect({ className, title = "信任与尊重" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M160 60l34 22v44c0 30-18 48-34 56-16-8-34-26-34-56V82z" fill={Tl} stroke={T} strokeWidth="3" />
      <path d="M144 128l12 12 22-26" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function SharedResponsibility({ className, title = "共同承担" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <rect x="80" y="80" width="160" height="100" rx="12" fill="#F0ECE5" stroke={MUT} strokeWidth="2" />
      <line x1="160" y1="80" x2="160" y2="180" stroke={Tl} strokeWidth="3" />
      <circle cx="120" cy="120" r="16" fill={T} />
      <circle cx="200" cy="120" r="16" fill={S} />
      <path d="M110 150h100" stroke={Sl} strokeWidth="4" strokeLinecap="round" />
    </Frame>
  );
}

export function FamilyFinance({ className, title = "家庭财务" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <rect x="90" y="70" width="140" height="100" rx="12" fill="#F0ECE5" stroke={MUT} strokeWidth="2" />
      <circle cx="130" cy="110" r="18" fill={T} />
      <rect x="160" y="96" width="50" height="34" rx="6" fill={Sl} />
      <path d="M170 113h30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 178c20-14 100-14 120 0" stroke={S} strokeWidth="4" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export function RelationshipRepair({ className, title = "关系修复" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M120 150c-20-30 0-60 40-60" stroke={Tl} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M200 150c20-30 0-60-40-60" stroke={Sl} strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="150" r="10" fill={T} />
      <path d="M150 110l10 12 18-22" stroke={S} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function HealthyBoundaries({ className, title = "心理边界" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <circle cx="110" cy="120" r="30" fill={Tl} stroke={T} strokeWidth="3" />
      <circle cx="210" cy="120" r="30" fill={Sl} stroke={S} strokeWidth="3" />
      <path d="M150 120h20" stroke={MUT} strokeWidth="3" strokeDasharray="4 4" />
    </Frame>
  );
}

export function WeeklyConversation({ className, title = "每周对话" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <rect x="86" y="74" width="148" height="96" rx="12" fill="#F0ECE5" stroke={MUT} strokeWidth="2" />
      <line x1="100" y1="100" x2="220" y2="100" stroke={Tl} strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="122" x2="200" y2="122" stroke={Sl} strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="144" x2="180" y2="144" stroke={Tl} strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="190" r="14" fill={T} />
    </Frame>
  );
}

export function FamilyBalance({ className, title = "家庭平衡" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <path d="M160 60v120" stroke={MUT} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 100h200" stroke={MUT} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="18" fill={T} />
      <circle cx="220" cy="100" r="18" fill={S} />
      <path d="M140 180h40l-8 14h-24z" fill={Tl} />
    </Frame>
  );
}

export function IntimacyCare({ className, title = "亲密与陪伴" }: IllProps) {
  return (
    <Frame title={title} className={className}>
      <circle cx="120" cy="110" r="22" fill={T} />
      <circle cx="200" cy="110" r="22" fill={S} />
      <path d="M142 110c6 8 12 8 18 0" stroke={Tl} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M120 150c0 20 16 30 40 30s40-10 40-30" fill={Tl} />
      <path d="M150 196l10-12 10 12" stroke={S} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export const ILLUSTRATIONS: Record<string, (p: IllProps) => React.ReactElement> = {
  marriageGrowth: MarriageGrowth,
  activeListening: ActiveListening,
  conflictResolution: ConflictResolution,
  emotionalConnection: EmotionalConnection,
  trustRespect: TrustRespect,
  sharedResponsibility: SharedResponsibility,
  familyFinance: FamilyFinance,
  relationshipRepair: RelationshipRepair,
  healthyBoundaries: HealthyBoundaries,
  weeklyConversation: WeeklyConversation,
  familyBalance: FamilyBalance,
  intimacyCare: IntimacyCare,
};

export function SectionIllustration({
  name,
  className,
  title,
}: {
  name: string;
  className?: string;
  title?: string;
}) {
  const C = ILLUSTRATIONS[name] ?? MarriageGrowth;
  return <C className={className} title={title} />;
}
