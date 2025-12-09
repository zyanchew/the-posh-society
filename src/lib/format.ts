export function money(amountCents: number, currency: string) {
return `${currency} ${(amountCents / 100).toFixed(2)}`;
}