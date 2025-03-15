import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { KeyCreateRequest } from '../../../interfaces/keys/KeyServiceInterface';
import { BalanceService } from '../../../services/balance/balance.service';
import { LocalStorageService } from '../../../services/storage/local-storage.service';
import { KeysService } from '../../../services/keys/keys.service';

@Component({
  selector: 'app-key-creation',
  imports: [
    FormsModule,
    HeaderComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './key-creation.component.html',
  styleUrl: './key-creation.component.css'
})
export class KeyCreationComponent {
  keyForm: FormGroup;
  openedKeyForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private storageService: LocalStorageService,
    private keyService: KeysService) {
    this.keyForm = this.fb.group({
      apiKeyName: ['', [Validators.required]],
      apiKey: ['', [Validators.required]]
    });
  }



  public addKeyData(): void {
    const userEmail: string | null = this.storageService.getItem("email");
    if(userEmail == null) {
      throw new Error("Email not found in storage");
    }
    const keyAddRequest: KeyCreateRequest = {
      keyName: this.keyForm.value.apiKeyName,
      apiKey:  this.keyForm.value.apiKey,
      createTime: new Date(),
      userEmail: userEmail
    }

    this.keyService.crateKey(keyAddRequest).subscribe(response => {
      this.keyService.notifyKeyAddition(keyAddRequest);
    });
  }

  public closeKeyForm():void {
    this.openedKeyForm = !this.openedKeyForm;
  }


}
