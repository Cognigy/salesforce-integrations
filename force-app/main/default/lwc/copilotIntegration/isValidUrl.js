export const isValidUrl = (string) => {
  try {
    return !!new URL(string);
  } catch {
    return false;
  }
};
