const DRIVE_HOSTS = new Set([
  "drive.google.com",
  "drive.usercontent.google.com",
]);

const extractDriveId = (url) => {
  // ?id= format
  const idFromQuery = url.searchParams.get("id");
  if (idFromQuery) return idFromQuery;

  // /file/d/ID/ format
  const match = url.pathname.match(/\/file\/d\/([^/]+)/);
  if (match && match[1]) return match[1];

  return null;
};

const getDriveCandidates = (id) => [
  // Best working format
  `https://drive.google.com/uc?export=view&id=${id}`,
  `https://drive.google.com/uc?export=download&id=${id}`,
];

export const getImageCandidates = (input) => {
  if (!input) return [""];

  try {
    const url = new URL(input);

    if (!DRIVE_HOSTS.has(url.hostname)) {
      return [input];
    }

    const id = extractDriveId(url);
    if (!id) return [input];

    return getDriveCandidates(id);
  } catch {
    return [input];
  }
};