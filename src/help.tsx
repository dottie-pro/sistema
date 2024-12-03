export const formatCPF = async (cpf: string) => {

    const cleanedCPF = cpf.replace(/\D/g, '');
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const formattedCPF = cleanedCPF.replace(cpfRegex, '$1.$2.$3-$4');

    return formattedCPF;
}

interface OpitionsDate extends Intl.DateTimeFormatOptions {
    timeZone: string;
}

export const formatTimeStamp = (timestamp?: string, time?: boolean) => {
    try {
        if (timestamp && time) {
            const date = new Date(timestamp);
            // date.setHours(date.getHours() - 3); 
            const options: OpitionsDate = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'America/Sao_Paulo'
            };
            return date.toLocaleString('pt-BR', options);
        }
        if (timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear());

            return `${day}/${month}/${year}`;
        }
    } catch (error) {
        return null
    }
};