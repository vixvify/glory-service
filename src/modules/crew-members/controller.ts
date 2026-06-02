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
    async ({ body }) => {
      const crewMember = await service.createCrewMember(body);
      return formatSuccess(crewMember, "Crew member created successfully");
    },
    {
      body: createCrewMemberSchema,
      requireAuth: true,
      requireRole: "admin",
    },
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      const crewMember = await service.updateCrewMember(id, body);
      return formatSuccess(crewMember, "Crew member updated successfully");
    },
    {
      params: updateCrewMemberParamsSchema,
      body: updateCrewMemberBodySchema,
      requireAuth: true,
      requireRole: "admin",
    },
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const crewMember = await service.deleteCrewMember(id);
      return formatSuccess(crewMember, "Crew member deleted successfully");
    },
    {
      params: deleteCrewMemberParamsSchema,
      requireAuth: true,
      requireRole: "admin",
    },
  );
