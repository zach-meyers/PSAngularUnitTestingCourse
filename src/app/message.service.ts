import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
	public messages: string[] = [];

	public add(message: string) {
		this.messages.push(message);
	}

	public clear() {
		this.messages = [];
	}
}
