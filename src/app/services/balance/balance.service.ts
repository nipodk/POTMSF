import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private socket!: WebSocket;
  private messageQueue: any[] = [];

  constructor() {

  }

  public connect(url: string): void {


    this.socket = new WebSocket(url) as WebSocket;

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
    };

    this.socket.onopen = () => {
      console.log("Balance is listening");

      while (this.messageQueue.length > 0) {
        const msg = this.messageQueue.shift();
        console.log("Sending queued message:", msg);
        this.socket.send(JSON.stringify(msg));
      }
    }

    this.socket.onerror = (error) => {
      console.log(`Error occurred while listening: ${error}`);
    }

    this.socket.onclose = () => {
      console.log("Balance isn't listened");
    }

  }

  public sendMessage(message: any):void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Sending WebSocket message:", message);
      this.socket.send(JSON.stringify(message));
    } else {
      console.log("WebSocket not ready, queuing message:", message);
      this.messageQueue.push(message);
    }
  }
}
