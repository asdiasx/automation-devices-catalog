export interface Device {
  id: string;
  name: string;
  type: string;
  localization: string;
  description: string;
}

export const devices: Device[] = [
  {
    id: '1',
    name: 'LPD-01',
    type: 'Lampada RGB',
    localization: 'Sala Chácara',
    description: 'Lampada no suporte de chão',
  },
  {
    id: '2',
    name: 'LPD-02',
    type: 'Lampada Branca',
    localization: 'Quarto Casal',
    description: 'Lampada no teto',
  },
  {
    id: '3',
    name: 'SW-01',
    type: 'Relé de 1 canal',
    localization: 'Celeiro',
    description: 'Controle do disjuntor de iluminação',
  },
];
