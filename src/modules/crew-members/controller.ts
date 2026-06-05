import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { CrewMemberRepositoryImpl } from "../../infrastructure/crew-member.repository";
import { AuthRepositoryImpl } from "../../infrastructure/auth.repository";
import { CrewMemberService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  createCrewMemberSchema,
  updateCrewMemberParamsSchema,
  updateCrewMemberBodySchema,
  getCrewMemberByIdParamsSchema,
  deleteCrewMemberParamsSchema,
  getCrewMembersQuerySchema,
} from "./domain/crew-member";

const repo = new CrewMemberRepositoryImpl();
const authRepo = new AuthRepositoryImpl();
const service = new CrewMemberService(repo, authRepo);

export const crewMemberRouter = new Elysia({ prefix: "/crew-members" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ query }) => {
      const crewMembers = await service.getCrewMembers(query);
      return formatSuccess(crewMembers);
    },
    {
      query: getCrewMembersQuerySchema,
    },
  )
  .get(
    "/my-crew",
    async ({ user }) => {
      const crewMembers = await service.getMyCrewMembers(user!.id);
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
      const crewMember = await service.getCrewMemberById(id);
      return formatSuccess(crewMember);
    },
    {
      params: getCrewMemberByIdParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body, user }) => {
      const crewMember = await service.createCrewMember(body, user!.id);
      return formatSuccess(crewMember);
    },
    {
      body: createCrewMemberSchema,
      requireAuth: true,
    },
  )
  .put(
    "/:id",
    async ({ params, body, user }) => {
      const { id } = params;
      const crewMember = await service.updateCrewMember(id, body, user!.id, user!.role);
      return formatSuccess(crewMember);
    },
    {
      params: updateCrewMemberParamsSchema,
      body: updateCrewMemberBodySchema,
      requireAuth: true,
    },
  )
  .delete(
    "/:id",
    async ({ params, user }) => {
      const { id } = params;
      const crewMember = await service.deleteCrewMember(id, user!.id, user!.role);
      return formatSuccess(crewMember);
    },
    {
      params: deleteCrewMemberParamsSchema,
      requireAuth: true,
    },
  );
