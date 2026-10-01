// Gera rotina-semanal.ics a partir dos horários de index.html.
// Uso: node tools/gerar-calendario.mjs   (corre sempre que mudares horários na app)
import fs from 'node:fs';

const INICIO = '2026-10-05';            // segunda em que começa a jornada
const UNTIL = '20270328T225959Z';       // fim da fase 2 (28/03/2027); a fase 3 é o modo exame
const TZ = 'Europe/Lisbon';
const APP = 'https://weynemilagre-png.github.io/we/';
const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const WEEK = JSON.parse(/const WEEK = (\{.*\});\n/.exec(html)[1]);
const CATS = new Function('return ' + /const CATS = (\{[\s\S]*?\n\});/.exec(html)[1])();

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
function fold(line) {
  const out = []; let cur = '', bytes = 0;
  for (const ch of line) {
    const b = Buffer.byteLength(ch);
    if (bytes + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; bytes = 0; }
    cur += ch; bytes += b;
  }
  out.push(cur);
  return out.join('\r\n ');
}
const pad = n => String(n).padStart(2, '0');
const local = (d, hhmm, plus = 0) => {
  const [h, m] = hhmm.split(':').map(Number);
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m + plus));
  return `${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00`;
};
const now = new Date();
const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T000000Z`;

const L = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Rotina 2026-27//PT', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
  'X-WR-CALNAME:Rotina 2026/27', `X-WR-TIMEZONE:${TZ}`,
  'X-WR-CALDESC:A semana normal da Rotina 2026/27. Atualiza-se sozinho.',
  'REFRESH-INTERVAL;VALUE=DURATION:PT12H', 'X-PUBLISHED-TTL:PT12H',
  'BEGIN:VTIMEZONE', `TZID:${TZ}`,
  'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0000', 'TZOFFSETTO:+0100', 'TZNAME:WEST', 'DTSTART:19700329T010000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
  'BEGIN:STANDARD', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0000', 'TZNAME:WET', 'DTSTART:19701025T020000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
  'END:VTIMEZONE'
];
let n = 0;
DIAS.forEach((k, i) => {
  const d = new Date(INICIO + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + i);
  for (const b of WEEK[k].blocos) {
    if (b.m.indexOf('g') < 0 || b.c === 'livre' || b.k === 0) continue;
    const desc = (b.n ? b.n + '\n\n' : '') + 'Rotina 2026/27: ' + APP;
    L.push('BEGIN:VEVENT',
      `UID:${k}-${b.t.replace(':', '')}@rotina-2026-27`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TZ}:${local(d, b.t)}`,
      `DTEND;TZID=${TZ}:${local(d, b.t, b.d)}`,
      `RRULE:FREQ=WEEKLY;UNTIL=${UNTIL}`,
      `SUMMARY:${esc(CATS[b.c].e + ' ' + b.ti)}`,
      `DESCRIPTION:${esc(desc)}`,
      `CATEGORIES:${esc(CATS[b.c].n)}`,
      `URL:${APP}`,
      'END:VEVENT');
    n++;
  }
});
L.push('END:VCALENDAR');
fs.writeFileSync(new URL('../rotina-semanal.ics', import.meta.url), L.map(fold).join('\r\n') + '\r\n');
console.log(`rotina-semanal.ics: ${n} eventos semanais`);
