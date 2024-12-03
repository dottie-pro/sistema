export const generateRandomId = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const formatMilhares = (value: number | string) => {
    const formattedValue = typeof value === 'string' ? parseFloat(value) : value;
    if (formattedValue >= 1000) {
        return `${new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(formattedValue / 1000)} mil`;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(formattedValue);
}

export const formatPorcentagem = (value: number | string) => {
    const formattedValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 }).format(formattedValue / 100);
}