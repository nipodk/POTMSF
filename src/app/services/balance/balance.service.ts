import { Injectable, NgZone } from '@angular/core';
import { SpecifiedTradeUpdate } from '../../interfaces/client-websocket/WebscoketInterface';
import { delay, Observable, retryWhen, Subject, tap, throttleTime } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private readonly WEBSOCKET_URL: string = "ws://localhost:8080/ws/balance-stream";
  private readonly ORDER_TRADE_UPDATE: string = "ORDER_TRADE_UPDATE";
  private readonly ACCOUNT_UPDATE: string = "ACCOUNT_UPDATE";

  private socket$: WebSocketSubject<any> | null = null;
  private orderTradeUpdateSubject = new Subject<SpecifiedTradeUpdate>();

  constructor(private ngZone: NgZone) {}

  public connect(): void {
    if (this.socket$ && !this.socket$.closed) {
      console.log("WebSocket already connected.");
      return;
    }

    console.log("Connecting WebSocket...");
    this.socket$ = webSocket(this.WEBSOCKET_URL);

    this.socket$
      .pipe(
        throttleTime(1000),
        retryWhen((errors) =>
          errors.pipe(
            tap((err) => console.error("WebSocket error:", err)),
            delay(2000)
          )
        )
      )
      .subscribe({
        next: (data) => {
          this.ngZone.runOutsideAngular(() => {
            if (data.eventName === "ORDER_TRADE_UPDATE") {
              const orderTradeUpdate: SpecifiedTradeUpdate = {
                key: data.keyName,
                orderTradeUpdate: data.orderTradeUpdate,
              };
              console.log("Received trade update:", orderTradeUpdate);
              this.orderTradeUpdateSubject.next(orderTradeUpdate);
            }
          });
        },
        error: (err) => console.error("WebSocket connection failed:", err),
        complete: () => console.log("WebSocket connection closed."),
      });
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      console.log("Sending message:", message);
      this.socket$.next(message);
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  public getOrderTradeUpdates(): Observable<SpecifiedTradeUpdate> {
    return this.orderTradeUpdateSubject.asObservable();
  }

  public close(): void {
    if (this.socket$) {
      console.log("Closing WebSocket...");
      this.socket$.complete();
      this.socket$ = null;
    }
  }
}
