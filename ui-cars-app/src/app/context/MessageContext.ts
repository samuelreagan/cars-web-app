'use client';

import { createContext } from "react";

export interface MessageData {
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string;
}

export interface MessageContextHandler {
    showMessage: (data: MessageData | undefined) => void;
}

export const MessageContext = createContext<MessageContextHandler>({
    showMessage: () => {}
});