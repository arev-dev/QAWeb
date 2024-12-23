export const formatTimeAgo = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `Publicado hace ${diffInSeconds} segundo${
      diffInSeconds !== 1 ? "s" : ""
    }`;
  } else if (diffInMinutes < 60) {
    return `Publicado hace ${diffInMinutes} minuto${
      diffInMinutes !== 1 ? "s" : ""
    }`;
  } else if (diffInHours < 24) {
    return `Publicado hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
  } else {
    return `Publicado hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
  }
};
