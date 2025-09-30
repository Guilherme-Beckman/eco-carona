export const formatCpf = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

  // CPF
  return cleanedValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};
