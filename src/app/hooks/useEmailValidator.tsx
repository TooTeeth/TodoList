export function useEmailValidator() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = (email: string) => emailRegex.test(email);

  return { isValidEmail };
}
