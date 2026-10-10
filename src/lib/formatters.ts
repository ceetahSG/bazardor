const unitLabels: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const formatUnit = (unit: string) => unitLabels[unit] ?? unit;

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD").format(price);
