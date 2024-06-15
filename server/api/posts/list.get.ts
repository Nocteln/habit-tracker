import { Post } from "~/server/models/Post";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Récupérer les paramètres de pagination de la requête
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 25;

  // Calculer le nombre de documents à ignorer
  const skip = (page - 1) * limit;

  // Récupérer les posts avec pagination et tri
  const posts = await Post.find({})
    .sort({ createdAt: -1 }) // Ordre décroissant de la date de création
    .skip(skip) // Ignorer les documents précédents
    .limit(limit); // Limiter les résultats à `limit` éléments

  // Récupérer le nombre total de documents
  const totalPosts = await Post.countDocuments();

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(totalPosts / limit);

  // Retourner les résultats paginés et les informations de pagination
  return {
    posts,
    pagination: {
      totalPosts,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
  };
});
