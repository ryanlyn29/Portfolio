type WireBackdropVariant = 'snapshot' | 'contact';

type WireBackdropProps = {
  variant: WireBackdropVariant;
  className?: string;
  contained?: boolean;
  height?: number;
};

const CIRCUIT_ROUTES: Record<
  WireBackdropVariant,
  { path: string; node: { x: number; y: number }; viewHeight: number }
> = {
  snapshot: {
    path: 'M -3000 128 H 1260 V 70 Q 1260 38 1292 38 H 3600',
    node: { x: 1260, y: 128 },
    viewHeight: 200,
  },
  contact: {
    path: 'M -3000 104 H 1250 V 268 Q 1250 294 1276 294 H 3600',
    node: { x: 1250, y: 104 },
    viewHeight: 320,
  },
};

const WIRE_LAYERS = [
  { color: '#2F70F7', width: 14, mobileWidth: 10 },
  { color: '#82B0FE', width: 9, mobileWidth: 6 },
  { color: '#CBDAFC', width: 3, mobileWidth: 2 },
] as const;

function CircuitPath({ path, mobile = false }: { path: string; mobile?: boolean }) {
  return WIRE_LAYERS.map((layer) => (
    <path
      key={`${mobile ? 'mobile' : 'desktop'}-${layer.color}`}
      d={path}
      stroke={layer.color}
      strokeWidth={mobile ? layer.mobileWidth : layer.width}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  ));
}

function CircuitNode({ left, top }: { left: string; top: string }) {
  return (
    <span
      className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#2F70F7] bg-[#82B0FE] sm:h-8 sm:w-8 sm:border-[5px]"
      style={{ left, top }}
    >
      <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-[#CBDAFC] bg-white sm:h-5 sm:w-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#EEF3FF]" />
      </span>
    </span>
  );
}

export function WireBackdrop({
  variant,
  className = '',
  contained = false,
  height = 180,
}: WireBackdropProps) {
  const route = CIRCUIT_ROUTES[variant];
  const nodeLeft = `${(route.node.x / 1200) * 100}%`;
  const nodeTop = `${(route.node.y / route.viewHeight) * 100}%`;
  const widthClassName = contained
    ? 'inset-x-0'
    : 'left-1/2 w-[calc(100%-2rem)] max-w-[1200px] -translate-x-1/2 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 hidden overflow-visible min-[1360px]:block ${widthClassName} ${className}`}
      style={{ height }}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 1200 ${route.viewHeight}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <g className="sm:hidden">
          <CircuitPath path={route.path} mobile />
        </g>
        <g className="hidden sm:inline">
          <CircuitPath path={route.path} />
        </g>
      </svg>

      <CircuitNode left={nodeLeft} top={nodeTop} />
    </div>
  );
}

const CONNECTED_SECTIONS_PATH =
  'M -3600 -180 H -108 V 190 Q -108 250 -50 250 H 1250 V 650 Q 1250 710 1310 710 H 3600';

const CONNECTED_SECTION_NODES = [
  { x: -50, y: 250 },
  { x: 1250, y: 250 },
  { x: 1250, y: 650 },
] as const;

type ConnectedSectionsWireProps = {
  className?: string;
  anchorHeight?: number;
  offsetTop?: number;
};

export function ConnectedSectionsWire({
  className = '',
  anchorHeight,
  offsetTop = 0,
}: ConnectedSectionsWireProps) {
  const anchored = anchorHeight != null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-0 hidden w-[calc(100%-4rem)] max-w-[1200px] -translate-x-1/2 overflow-visible min-[1360px]:block ${
        anchored ? '' : 'inset-y-0'
      } ${className}`}
      style={
        anchored
          ? {
              top: -offsetTop,
              height: anchorHeight,
            }
          : undefined
      }
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1200 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <CircuitPath path={CONNECTED_SECTIONS_PATH} />
      </svg>

      {CONNECTED_SECTION_NODES.map((node) => (
        <CircuitNode
          key={`${node.x}-${node.y}`}
          left={`${(node.x / 1200) * 100}%`}
          top={`${(node.y / 1000) * 100}%`}
        />
      ))}
    </div>
  );
}

const PROJECTS_PATH =
  'M -3600 382 H -118 Q -50 382 -50 314 V 206 Q -50 126 30 126 H 3600 M -3600 314 H -50';

const PROJECT_NODES = [
  { x: -50, y: 314 },
  { x: 1250, y: 126 },
] as const;

export function ProjectsWire() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[460px] overflow-visible min-[1360px]:block"
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1200 460"
        preserveAspectRatio="none"
        fill="none"
      >
        <CircuitPath path={PROJECTS_PATH} />
      </svg>

      {PROJECT_NODES.map((node) => (
        <CircuitNode
          key={`${node.x}-${node.y}`}
          left={`${(node.x / 1200) * 100}%`}
          top={`${(node.y / 460) * 100}%`}
        />
      ))}
    </div>
  );
}
