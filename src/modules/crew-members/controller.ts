import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { crewMemberService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";
import {
  createCrewMemberSchema,
  updateCrewMemberParamsSchema,
  updateCrewMemberBodySchema,
  getCrewMemberByIdParamsSchema,
  deleteCrewMemberParamsSchema,
  getCrewMembersQuerySchema,
} from "./domain/crew-member";

export const crewMemberRouter = new Elysia({ prefix: "/crew-members" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ query }) => {
      const crewMembers = await crewMemberService.getCrewMembers(query);
      return formatSuccess(crewMembers);
    },
    {
      query: getCrewMembersQuerySchema,
    },
  )
  .get(
    "/my-crew",
    async ({ user }) => {
      const crewMembers = await crewMemberService.getMyCrewMembers(user!.id);
      return formatSuccess(crewMembers);
    },
    {
      requireAuth: true,
    },
  )
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const crewMember = await crewMemberService.getCrewMemberById(id);
      return formatSuccess(crewMember);
    },
    {
      params: getCrewMemberByIdParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body, user }) => {
      const crewMember = await crewMemberService.createCrewMember(body, user!.id);
      return formatSuccess(crewMember);
    },
    {
      body: createCrewMemberSchema,
      requireAuth: true,
    },
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      const crewMember = await crewMemberService.updateCrewMember(id, body);
      return formatSuccess(crewMember);
    },
    {
      params: updateCrewMemberParamsSchema,
      body: updateCrewMemberBodySchema,
      requireAuth: true,
      requireCrewMemberOwner: true,
    },
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const crewMember = await crewMemberService.deleteCrewMember(id);
      return formatSuccess(crewMember);
    },
    {
      params: deleteCrewMemberParamsSchema,
      requireAuth: true,
      requireCrewMemberOwner: true,
    },
  );
