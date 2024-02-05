declare module "rgbquant" {
  export default class RGBQuant {
    constructor(options: { colors: number });
    sample(image: HTMLImageElement): void;
    palette(medianCutQuant: boolean): Array<[number, number, number]>;
  }
}
