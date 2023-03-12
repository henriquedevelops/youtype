import { PopulatedParticipant } from "../typescriptTypes/conversation";

/* Generates a string that contains the username of the conversation 
participants separated by a comma */
export const formatParticipantsUsernames = (
  participants: Array<PopulatedParticipant>,
  loggedUserId: string
): string => {
  const formattedString = participants
    .filter((participant) => participant.user.id != loggedUserId)
    .map((participant) => participant.user.username);

  return formattedString.join(", ");
};

export const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
};
