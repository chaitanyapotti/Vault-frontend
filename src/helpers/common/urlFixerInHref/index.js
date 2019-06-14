const ensureHttpUrl = websiteUrl => {
  if (!websiteUrl) {
    return;
  }
  if (websiteUrl.includes("http")) {
    return websiteUrl;
  }
  return `//${websiteUrl}`;
};

export { ensureHttpUrl };
