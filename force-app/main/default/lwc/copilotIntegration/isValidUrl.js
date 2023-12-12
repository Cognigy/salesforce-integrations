export const isValidUrl = (string) => {
  try {
    URL(string);
    return true;
  } catch (err) {
    return false;
  }
};
