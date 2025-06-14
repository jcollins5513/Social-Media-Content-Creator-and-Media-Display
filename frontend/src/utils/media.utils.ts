/**
 * Checks if a given filename corresponds to a 360-degree image based on common naming patterns.
 * @param filename - The name of the image file.
 * @returns `true` if the filename suggests it's a 360° image, otherwise `false`.
 */
export const is360Image = (filename: string): boolean => {
  if (!filename) return false;
  const lowerFilename = filename.toLowerCase();
  // Common patterns used to identify 360-degree or panoramic images
  const patterns = ['360', 'pano', 'sphere', 'panorama', 'equirectangular'];
  return patterns.some(pattern => lowerFilename.includes(pattern));
};
