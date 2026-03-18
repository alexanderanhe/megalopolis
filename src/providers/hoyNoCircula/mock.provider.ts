import HoyNoCirculaProvider, { HoyNoCirculaData } from './provider';
import { toDateString } from '../../utils/date';

export default class HoyNoCirculaMockProvider extends HoyNoCirculaProvider {
  async getToday(): Promise<HoyNoCirculaData> {
    return {
      date: toDateString(),
      scope: ['CDMX', 'EDOMEX'],
      restrictionStart: '05:00',
      restrictionEnd: '22:00',
      restrictions: {
        color: 'rojo',
        plateEndings: [3, 4],
        holograms: ['1', '2']
      },
      exemptions: ['00', '0', 'eléctricos', 'híbridos']
    };
  }
}
