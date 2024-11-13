const cpf = (value: string): string => {
  if (!value) return '';

  value = value.replace(/\D/g, '').slice(0, 11);

  return value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export const inputMask = {
  cpf,
}
