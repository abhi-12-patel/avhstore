const DRIVE_HOSTS = new Set([
  'drive.google.com',
  'drive.usercontent.google.com',
]);

const extractDriveId = (url) => {
  const idFromQuery = url.searchParams.get('id');
  if (idFromQuery) return idFromQuery;

  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
  if (pathMatch && pathMatch[1]) return pathMatch[1];

  return null;
};

const getDriveCandidates = (id, original) => [
  `https://lh3.googleusercontent.com/d/${id}`,
  `https://drive.google.com/uc?export=view&id=${id}`,
  `https://drive.google.com/uc?export=download&id=${id}`,
  original,
];

export const getImageCandidates = (input) => {
  if (!input) return [''];

  try {
    const url = new URL(input);

    if (!DRIVE_HOSTS.has(url.hostname)) {
      return [input];
    }

    const id = extractDriveId(url);
    if (!id) return [input];

    return getDriveCandidates(id, input);
  } catch (error) {
    return [input];
  }
};
