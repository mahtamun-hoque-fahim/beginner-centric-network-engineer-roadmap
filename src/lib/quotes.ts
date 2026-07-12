export const motivationalQuotes = [
  'One task closer to the engineer you are becoming.',
  'Nobody starts knowing subnetting. You just did it anyway.',
  'This is the part nobody sees — and it is the part that counts.',
  'Every native networking graduate started exactly where you are now.',
  "You didn't know this existed yesterday. Now you do.",
  'Small task. Real skill. Keep going.',
  'The gap between you and interview-ready just got smaller.',
  'This is what "figuring it out" actually looks like.',
  'You showed up today. That is the whole game.',
  'Consistency beats intensity. You just proved it again.',
  'Six months from now, this is the boring day that mattered.',
  'You just did something most people only talk about doing.',
]

export function getRandomQuote(excludeLast?: string) {
  const pool = excludeLast
    ? motivationalQuotes.filter((q) => q !== excludeLast)
    : motivationalQuotes
  return pool[Math.floor(Math.random() * pool.length)]
}
