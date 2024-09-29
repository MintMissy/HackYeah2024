import {Injectable, signal} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SiteInformation} from "../../domain/site-information.interface";
import {MessagePayload} from "../../domain/message-payload.interface";
import {environment} from "../../../environment/env";
import {map, tap} from "rxjs";

export interface ChatAssistantState {
    messageHistory: {
        fromServer: boolean;
        message: string;
    }[],
    threadId: string;
    assistantId: string;
    currentUrl: string;
    actions: { send: boolean, message: string }[];
}

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    mockedActions: { send: boolean, message: string }[] = [{
        send: false,
        message: "Przejrzyj oferte"
    }, {
        send: false,
        message: 'Przejrzyj realizacje'
    }, {
        send: false,
        message: 'Zostaw numer telefonu'
    }]

    _initState: ChatAssistantState = {
        messageHistory: [{
            fromServer: true,
            message: 'Najważniejsze informacje na stronie: Opis:  Firma stolarska; Nr telefonu: 603 316 828'
        }, {
            fromServer: false,
            message: "Jaki jest adres"
        }, {
            fromServer: true,
            message: "ul. Zielona 1a, 64-115 Świętochowa"
        }],
        threadId: '123',
        assistantId: '321',
        currentUrl: 'mock.com',
        actions: this.mockedActions
    }

    _chatAssistantState = signal<ChatAssistantState>(this._initState);

    baseUrl = `${environment.apiUrl}/api/v1`;

    constructor(private http: HttpClient) {
    }

    fetchSiteInformation() {
        const params = new HttpParams().set('url', this.getUrl());
        // const params = new HttpParams().set('url', 'http://www.cornerburger.pl/');
        // http://ec2-3-71-86-240.eu-central-1.compute.amazonaws.com:8080/api/v1/crawler/crawl?url=http%3A%2F%2Fwww.cornerburger.pl%2F
        return this.http.get<SiteInformation>(`${this.baseUrl}/crawler/crawl`, {params})
    }

    initializeChatAssistant() {
        const params = new HttpParams().set('htmlUrl', this.getUrl());
        return this.http.post<any>(`${this.baseUrl}/conversation`, {params})
            .pipe(
                map((response) => {
                        this._chatAssistantState.update(state => ({
                                ...state,
                                messageHistory: [...state.messageHistory, {
                                    message: response.content.response,
                                    fromServer: true
                                }],
                                threadId: response.metadata.threadId,
                                assistantId: response.metadata.assistantId,
                                actions: this.mockedActions
                            })
                        )
                    }
                )
            )
    }

    sendMessage(message: MessagePayload, threadId: string, assistantId: string) {
        return this.http.post<any>(`${this.baseUrl}/messages/thread/${threadId}/assistant/${assistantId}`, message)
            .pipe(
                tap((res) => this._chatAssistantState.update(state => ({
                    ...state,
                    messageHistory: [...state.messageHistory, {message: message.content, fromServer: false}, {
                        message:
                        res
                            .content.response,
                        fromServer: true
                    }]
                })))
            );
    }

    setUrl(url: string) {
        this._chatAssistantState.update(state => ({...state, currentUrl: url}));
    }

    getUrl() {
        return this._chatAssistantState().currentUrl;
    }
}


