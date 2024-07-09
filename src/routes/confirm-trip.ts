import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(ptBr);
dayjs.extend(localizedFormat);

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      return reply.status(201).send({
        trip: request.params.tripId,
      });
    }
  );
}
