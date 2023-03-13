import { PopulatedParticipant } from "../typescriptTypes/user";

/* Check if there is a participant with the id that matches the
   currently authenticated user id */
export function verifyConversationParticipant(
  participants: Array<PopulatedParticipant>,
  currentUserId: string
): boolean {
  return !!participants.find((participant) => participant.id === currentUserId);
}
