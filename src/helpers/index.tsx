export const generateRandomId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatBigNumber = (value: number | string) => {
  const formattedValue = typeof value === "string" ? parseFloat(value) : value;
  const absValue = Math.abs(formattedValue);

  if (absValue >= 1e12) {
    return `${new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(formattedValue / 1e12)} trilhões`;
  } else if (absValue >= 1e9) {
    return `${new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(formattedValue / 1e9)} bilhões`;
  } else if (absValue >= 1e6) {
    return `${new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(formattedValue / 1e6)} milhões`;
  } else if (absValue >= 1e3) {
    return `${new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(formattedValue / 1e3)} mil`;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(formattedValue);
};

export const formatPorcentagem = (value: number | string) => {
  const formattedValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(formattedValue / 100);
};
