import { HoyNoCirculaData } from '../providers/hoyNoCircula/provider';

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const MONTHS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
];

const capitalize = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const joinWithAnd = (values: Array<string | number>) => {
  const items = values.map(String);
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items[0] + ' y ' + items[1];
  return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
};

const formatHncDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  const weekday = WEEKDAYS[parsed.getDay()];
  const monthShort = MONTHS[parsed.getMonth()];
  return `${weekday} · ${day} ${monthShort}`;
};

type HncComputed = {
  formattedDate: string;
  restrictionSummary: string;
  hologramSummary: string;
  restrictionHours: string;
};

const buildHncComputed = (data: HoyNoCirculaData): HncComputed => {
  const plateSummary = joinWithAnd(data.restrictions.plateEndings);
  const hologramSummary = joinWithAnd(data.restrictions.holograms);

  return {
    formattedDate: formatHncDate(data.date),
    restrictionSummary: `${capitalize(data.restrictions.color)} · ${plateSummary}`,
    hologramSummary: `Holograma ${hologramSummary}`,
    restrictionHours: `${data.restrictionStart} — ${data.restrictionEnd}`
  };
};

const resolveWidgetStatus = (data: HoyNoCirculaData) => {
  const hasRestrictions =
    data.restrictions.plateEndings.length > 0 || data.restrictions.holograms.length > 0;
  return hasRestrictions ? 'restricted' : 'ok';
};

export { buildHncComputed, resolveWidgetStatus };
