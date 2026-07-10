export type Mode = 'pomodoro' | 'short-break' | 'long-break'

export const MODE_DURATIONS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  'short-break': 5 * 60,
  'long-break': 15 * 60,
}

export const modes: { key: Mode; label: string }[] = [
  { key: 'pomodoro', label: 'Pomodoro' },
  { key: 'short-break', label: 'Short Break' },
  { key: 'long-break', label: 'Long Break' },
]
