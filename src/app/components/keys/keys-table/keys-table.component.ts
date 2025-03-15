import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { NgIf } from '@angular/common';
import { KeyDto, KeyUpdateRequest } from '../../../interfaces/keys/KeyServiceInterface';
import { KeysService } from '../../../services/keys/keys.service';
import { LocalStorageService } from '../../../services/storage/local-storage.service';
import { take } from 'rxjs';
import { LoadingComponent } from '../../loading/loading/loading.component';

interface UpdateKeyStatus {
  keyName: boolean,
  apiKey: boolean,
  updatedKeyName: string
  updatedApiKey: string
}

@Component({
  selector: 'app-keys-table',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    MatHeaderCellDef,
    LoadingComponent
  ],
  templateUrl: './keys-table.component.html',
  styleUrl: './keys-table.component.css',
  standalone: true
})
export class KeysTableComponent implements OnInit {
  public apiKeys: MatTableDataSource<KeyDto>[] = [];
  public updateKeysStates: {[key: string] :UpdateKeyStatus} = {};
  public isDataLoading: boolean = true;

  constructor(
    private keysService: KeysService,
    private localStorage: LocalStorageService
  ) {
  }

  displayedColumns: string[] = ['keyName', 'apiKey', "update", "delete"];

  public activateUpdateAction(event: any, keyName: string) {
    this.updateKeysStates[keyName].keyName = false;
  }

  public getUpdatedValue(event: any, keyName: string) {
    const elementName: string = event.target.name;
    if(elementName === "apiKey"){
      this.updateKeysStates[keyName].updatedApiKey = event.target.value;
    }
    else {
      this.updateKeysStates[keyName].updatedKeyName = event.target.value;
    }
  }


  public updateKeyData(keyName: string){
    console.log("Hi")

    const updatedKey: KeyDto = {
      keyName: this.updateKeysStates[keyName].updatedKeyName,
      apiKey: this.updateKeysStates[keyName].updatedApiKey,
      createTime: new Date
    }

    const keyUpdateRequest: KeyUpdateRequest = {
      keyDto: updatedKey,
      keyName: keyName,
      userEmail: this.localStorage.getItem("email")
    }

    this.keysService.updateUserKey(keyUpdateRequest).subscribe(data => console.log(data));

  }

  public deleteKey(keyName: string) {
    this.keysService.deleteUserKey(this.localStorage.getItem("email"), keyName).subscribe(
      deleteKeyRes => {
        const table = this.apiKeys[0];
        table.data = table.data.filter(key => deleteKeyRes.name !==  key.keyName);
        table._updateChangeSubscription();
      }
    );
  }

  ngOnInit(): void {
    this.keysService.getUserKeys(this.localStorage.getItem("email")).pipe(take(1)).subscribe(keyData => {
      keyData.userKeys.forEach(key => {
          this.updateKeysStates[key.keyName] = {
            apiKey: true, keyName: true,
            updatedKeyName: key.keyName, updatedApiKey: key.apiKey
          }
      })

      if (this.apiKeys.length === 0) {
        this.apiKeys.push(new MatTableDataSource<KeyDto>(keyData.userKeys));
      } else {
        const table = this.apiKeys[0];
        table.data = [...table.data, ...keyData.userKeys];
        table._updateChangeSubscription();
      }
      this.isDataLoading = false;
    })

    this.keysService.keyAdded$.subscribe(newKey => {
      const keyDto: KeyDto = {
        keyName: newKey.keyName,
        apiKey: newKey.apiKey,
        createTime: new Date
      }

      this.updateKeysStates[newKey.keyName] = {
        apiKey: true, keyName: true,
        updatedKeyName: newKey.keyName, updatedApiKey: newKey.apiKey
      }

      const table = this.apiKeys[0];
      console.log(table.data)
      table.data = [...table.data, keyDto];
      table._updateChangeSubscription();
    })
  }

}
