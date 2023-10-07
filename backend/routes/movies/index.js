const express = require("express");
const prisma = require("../../db/prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 20, search } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);

    const skip = (parsedPage - 1) * parsedPageSize;

    let movies;
    let total;

    if (search) {
      [movies, total] = await Promise.all([
        prisma.movie.findMany({
          where: {
            title: {
              contains: search,
              mode: "insensitive",
            },
            overview: {
              contains: search,
              mode: "insensitive",
            },
          },
          skip,
          take: parsedPageSize,
        }),
        prisma.movie.count({
          where: {
            title: {
              contains: search,
              mode: "insensitive",
            },
            overview: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);
    } else {
      [movies, total] = await Promise.all([
        prisma.movie.findMany({
          skip,
          take: parsedPageSize,
        }),
        prisma.movie.count(),
      ]);
    }

    const totalPages = Math.ceil(total / parsedPageSize);

    return res.status(200).json({
      movies,
      metadata: {
        total,
        totalPages,
        currentPage: parsedPage,
        pageSize: parsedPageSize,
      },
    });
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
