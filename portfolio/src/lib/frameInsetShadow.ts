/** Inset shadows tinted to each pastel frame color. */
export const FRAME_INSET_SHADOWS: Record<string, string> = {
  '#EBBAC7':
    'inset 0 4px 14px rgba(196, 140, 179, 0.62), inset 0 14px 40px rgba(120, 65, 85, 0.32)',
  '#C4D7D1':
    'inset 0 4px 14px rgba(96, 160, 135, 0.62), inset 0 14px 40px rgba(45, 90, 75, 0.32)',
  '#B5CDEF':
    'inset 0 4px 14px rgba(75, 131, 196, 0.62), inset 0 14px 40px rgba(30, 60, 110, 0.32)',
  '#F5EDE3':
    'inset 0 4px 14px rgba(210, 185, 155, 0.58), inset 0 14px 40px rgba(140, 110, 80, 0.3)',
  '#FEF3C7':
    'inset 0 4px 14px rgba(225, 185, 75, 0.58), inset 0 14px 40px rgba(155, 115, 25, 0.3)',
};

export function getFrameInsetShadow(color: string): string {
  return FRAME_INSET_SHADOWS[color] ?? FRAME_INSET_SHADOWS['#B5CDEF'];
}

export function frameCardStyle(color: string): { backgroundColor: string; boxShadow: string } {
  return {
    backgroundColor: color,
    boxShadow: getFrameInsetShadow(color),
  };
}
