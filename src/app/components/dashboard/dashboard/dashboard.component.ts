import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LocalStorageService } from '../../../services/storage/local-storage.service';
import { BalanceService } from '../../../services/balance/balance.service';
import { NgIf } from '@angular/common';
import { KeysService } from '../../../services/keys/keys.service';
import { take } from 'rxjs';
import { KeyCreationComponent } from '../../keys/key-creation/key-creation.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { LoadingComponent } from '../../loading/loading/loading.component';

export interface TableState {
  tableName: string,
  tableShow: boolean
}

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    HeaderComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    KeyCreationComponent,
    DataTableComponent,
    LoadingComponent
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public numberOfKeys: number = 2 ;
  public tableStates:TableState[] = [];
  public isDataLoading: boolean = true;
  constructor(
    private balanceService: BalanceService,
    private storageService: LocalStorageService,
    private keyService: KeysService) {

  }

  ngOnInit(): void {
    const userEmail: string | null = this.storageService.getItem("email");
    if (userEmail == null) {
      throw new Error("Email not found in storage");
    }
      this.keyService.getUserKeys(userEmail).pipe(take(1)).subscribe(keyGetResponse => {
      console.log("works in get users")
      this.numberOfKeys = keyGetResponse.userKeys.length;
      if (this.numberOfKeys > 0) {
        this.balanceService.connect();
        this.balanceService.sendMessage({email: userEmail})
        this.tableStates = keyGetResponse.userKeys.map(userKey => {
          const tableState: TableState = {
            tableName: userKey.keyName,
            tableShow: true
          }
          return tableState;
        });
      }
      this.isDataLoading = false;
    })
  }

  ngOnDestroy(): void {
    console.log("Leaving Dashboard, closing WebSocket...");
    this.balanceService.close();
  }

}
