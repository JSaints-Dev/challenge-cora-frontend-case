export function sortDate(a: string, b: string) {
    const dateTimeA = new Date(a).getTime();
    const dateTimeB = new Date(b).getTime();
    return dateTimeB < dateTimeA ? 1 : -1;
}
