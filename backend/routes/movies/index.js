const express = require("express");
const prisma = require("../../db/prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20; // Set the page size to 20 movies per page
    const skip = (page - 1) * pageSize;
    const searchTerm = req.query.search || "";

    const movies = await prisma.movie.findMany({
      skip,
      take: pageSize,
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            overview: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!movie) {
      return res.status(404).json({ notFound: true });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
