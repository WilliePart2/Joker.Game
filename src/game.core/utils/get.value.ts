export function getValue <T>(value: any): T {
    if (Array.isArray(value)) {
        return [...value] as any;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
        return {...(value as any)};
    } else {
        return value;
    }
}