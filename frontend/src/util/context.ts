import { createContext } from "react";
import {
  PopulatedConversation,
  SelectedConversationContextType,
} from "../typescriptTypes/conversation";

export const SelectedConversationContext =
  createContext<SelectedConversationContextType>({
    selectedConversation: {} as PopulatedConversation,
  });
