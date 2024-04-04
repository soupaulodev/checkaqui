import { FastifyInstance } from "fastify";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function checkIn(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        params: z.object({
          attendeeId: z.string().uuid(),
        }),
        response: {
          201: z.null,
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendeesCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId,
        },
      });

      if (attendeesCheckIn !== null) {
        throw new Error("Attendee already checked in!");
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      });

      return reply.status(201).send();
    }
  );
}