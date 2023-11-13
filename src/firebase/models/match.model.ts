import { IMessage } from './message.model';

export interface IMatch {
    isMatched: boolean;
    lastMessage: IMessage | null;
    matchId: string;
    participants: string[];
}
