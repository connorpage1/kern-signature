export const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 10);
    const length = cleaned.length;

    if (length === 0) return '';
    if (length < 4) return cleaned;
    if (length < 7) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};