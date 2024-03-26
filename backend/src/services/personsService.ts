import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPersonById = async (personId: number) => {
  const person = await prisma.persons.findUnique({
    where: {
      id: personId,
    },
    include: {
      movieCast: {
        where: {
          personId: personId,
        },
      },
      movieCrew: {
        where: {
          personId: personId,
        },
      },
    },
  });

  return person;
};

export { getPersonById };
