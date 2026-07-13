import type { ReactNode } from 'react';
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  ChartColumnIncreasing,
  Database,
} from 'lucide-react';

const CIRCUIT_PATHS = [
  'M-40 94 H180 C220 94 238 112 238 152 V182 C238 222 258 242 298 242 H350 C392 242 414 228 414 188 V-40',
  'M414 212 H520 C564 212 586 190 586 146 V88 C586 54 604 36 638 36 H642 C652 36 658 30 658 20 V-30',
  'M-40 412 H330 C378 412 402 436 402 484 V602 H326 C290 602 270 582 270 546 V490',
  'M-40 590 H170 C212 590 230 612 230 652 V668 C230 704 252 722 290 722 H354 C390 722 408 704 408 668 V606 H486 C530 606 554 622 574 656 C592 686 616 700 654 700 H718 C752 700 770 682 770 648 V632 C770 596 790 578 826 578 H848 C882 578 900 598 900 632 V760',
  'M1640 76 H1488 C1452 76 1440 78 1428 78 V-30',
  'M1428 78 H1320 C1278 78 1256 100 1256 142 V174 C1256 214 1278 236 1318 236 H1356 C1396 236 1416 258 1416 298 V316 C1416 356 1438 378 1478 378 H1640',
  'M1640 438 H1530 C1492 438 1474 456 1474 494 V506 C1474 542 1456 560 1420 560 H1326 C1288 560 1268 580 1268 618 V760',
  'M1640 580 H1488 C1450 580 1430 600 1430 638 V652 C1430 688 1412 706 1376 706 H1254 C1216 706 1198 688 1198 650 V612 H1124 C1084 612 1062 632 1062 672 V760',
];

const MOBILE_CIRCUIT_PATHS = [
  'M72 -40 V82 Q72 112 42 112 H-40',
  'M400 112 H336 Q306 112 306 142 V186 Q306 216 336 216 H400',
  'M-40 552 H58 Q88 552 88 582 V700 H306 V576 Q306 546 336 546 H400',
] as const;

const MOBILE_CIRCUIT_NODES = [
  [72, 82],
  [306, 186],
  [58, 552],
  [306, 576],
] as const;

const COMPACT_CIRCUIT_PATHS = [
  'M92 -40 V110 Q92 140 62 140 H-40',
  'M520 120 H430 Q400 120 400 150 V190 Q400 220 430 220 H520',
  'M-40 500 H66 Q96 500 96 530 V660 H400 V530 Q400 500 430 500 H520',
] as const;

const COMPACT_CIRCUIT_NODES = [
  [92, 110],
  [400, 190],
  [66, 500],
  [400, 530],
] as const;

function CircuitLabel({
  className,
  icon,
  children,
}: {
  className: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-20 hidden min-h-12 items-center gap-2.5 rounded-[18px] border border-[#BFDBFE] bg-white px-5 py-3 text-[15px] font-semibold text-[#2563EB] xl:flex ${className}`}
    >
      <span className="flex h-[22px] w-[22px] items-center justify-center">{icon}</span>
      {children}
    </div>
  );
}

function DesktopCircuitRoutes() {
  const nodes = [
    [414, 212],
    [402, 602],
    [1428, 78],
    [1268, 618],
  ];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 hidden h-full w-full min-[680px]:block"
      viewBox="0 0 1600 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {CIRCUIT_PATHS.map((path) => (
          <path
            key={`track-${path}`}
            d={path}
            stroke="#4E88F3"
            strokeWidth="20"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {CIRCUIT_PATHS.map((path) => (
          <path
            key={`fill-${path}`}
            d={path}
            stroke="#74A8FF"
            strokeWidth="14"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {CIRCUIT_PATHS.map((path) => (
          <path
            key={`highlight-${path}`}
            d={path}
            stroke="#DCE9FF"
            strokeWidth="5"
            opacity="0.78"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {nodes.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r="18"
            fill="#FFFFFF"
            stroke="#4F8DF7"
            strokeWidth="7"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={cx} cy={cy} r="5" fill="#E8F0FF" />
        </g>
      ))}

      <g fill="#BBD2FA" opacity="0.62">
        {Array.from({ length: 6 }).flatMap((_, row) =>
          Array.from({ length: 6 }).map((__, column) => (
            <circle key={`left-${row}-${column}`} cx={56 + column * 22} cy={150 + row * 22} r="3" />
          )),
        )}
        {Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 7 }).map((__, column) => (
            <circle key={`right-${row}-${column}`} cx={1460 + column * 22} cy={190 + row * 22} r="3" />
          )),
        )}
      </g>
    </svg>
  );
}

function EdgeCircuitRoutes({
  paths,
  nodes,
  className,
  viewBox,
}: {
  paths: readonly string[];
  nodes: ReadonlyArray<readonly [number, number]>;
  className: string;
  viewBox: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {paths.map((path) => (
          <path
            key={`mobile-track-${path}`}
            d={path}
            stroke="#4E88F3"
            strokeWidth="12"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {paths.map((path) => (
          <path
            key={`mobile-fill-${path}`}
            d={path}
            stroke="#74A8FF"
            strokeWidth="8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {paths.map((path) => (
          <path
            key={`mobile-highlight-${path}`}
            d={path}
            stroke="#DCE9FF"
            strokeWidth="3"
            opacity="0.82"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {nodes.map(([cx, cy]) => (
        <g key={`mobile-${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r="12"
            fill="#FFFFFF"
            stroke="#4F8DF7"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={cx} cy={cy} r="3.5" fill="#E8F0FF" />
        </g>
      ))}
    </svg>
  );
}

function MobileCircuitRoutes() {
  return (
    <EdgeCircuitRoutes
      paths={MOBILE_CIRCUIT_PATHS}
      nodes={MOBILE_CIRCUIT_NODES}
      className="absolute inset-0 h-full w-full min-[480px]:hidden"
      viewBox="0 0 360 650"
    />
  );
}

function CompactCircuitRoutes() {
  return (
    <EdgeCircuitRoutes
      paths={COMPACT_CIRCUIT_PATHS}
      nodes={COMPACT_CIRCUIT_NODES}
      className="absolute inset-0 hidden h-full w-full min-[480px]:block min-[680px]:hidden"
      viewBox="0 0 480 620"
    />
  );
}

export function CircuitHero() {
  return (
    <section
      id="top"
      data-hero
      className="bg-paper px-4 pb-4 pt-24 sm:px-7 sm:pb-7 sm:pt-28"
    >
      <div className="relative isolate mx-auto flex min-h-[620px] w-full max-w-[1760px] items-center justify-center overflow-hidden rounded-[30px] border border-[#DBEAFE] bg-[#EEF4FF] px-5 py-14 sm:min-h-[600px] sm:rounded-[36px] sm:px-8 sm:py-16 md:min-h-[560px] xl:aspect-[20/9] xl:min-h-0 xl:px-6 xl:py-20">
        <MobileCircuitRoutes />
        <CompactCircuitRoutes />
        <DesktopCircuitRoutes />

        <CircuitLabel className="left-[10.5%] top-[11%]" icon={<BrainCircuit size={20} strokeWidth={1.8} />}>
          AI
        </CircuitLabel>
        <CircuitLabel className="left-[11%] top-[62%]" icon={<Database size={20} strokeWidth={1.8} />}>
          Data
        </CircuitLabel>
        <CircuitLabel className="right-[10%] top-[18%]" icon={<Boxes size={20} strokeWidth={1.8} />}>
          Systems
        </CircuitLabel>
        <CircuitLabel
          className="bottom-[18%] right-[7.5%]"
          icon={<ChartColumnIncreasing size={20} strokeWidth={1.8} />}
        >
          Product
        </CircuitLabel>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-7 inline-flex min-h-12 max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#DBEAFE] bg-white px-4 py-2 text-sm font-medium text-[#0B1735] sm:mb-9 sm:gap-3 sm:px-5 xl:mb-10">
            <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">
              OPEN
            </span>
            <span>to PM &amp; SWE internships</span>
          </div>

          <h1 className="text-balance font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[#0B1735] sm:text-6xl lg:text-7xl xl:text-[clamp(3.6rem,6vw,6.6rem)] xl:tracking-[-0.06em]">
            hi, i&apos;m ryan <span aria-hidden="true">&#128075;</span>
          </h1>

          <p className="mt-5 max-w-[660px] text-balance text-base leading-[1.55] text-[#596274] sm:mt-6 sm:text-[1.2rem] xl:mt-7 xl:text-[1.35rem]">
            glad you stopped by &mdash; i build realtime tools, applied AI, and clean data systems.
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center xl:mt-10">
            <a
              href="#projects"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[18px] bg-[#0B1735] px-7 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#223A63] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#4F8DF7]"
            >
              View projects <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-14 items-center justify-center rounded-[18px] border border-[#BFDBFE] bg-white px-7 text-base font-semibold text-[#0B1735] transition-colors duration-150 hover:border-[#4F8DF7] hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#4F8DF7]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
