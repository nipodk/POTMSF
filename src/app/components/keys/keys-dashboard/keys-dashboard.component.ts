import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { KeysTableComponent } from '../keys-table/keys-table.component';
import { KeyCreationComponent } from '../key-creation/key-creation.component';

@Component({
  selector: 'app-keys-dashboard',
  imports: [
    HeaderComponent,
    KeysTableComponent,
    KeyCreationComponent
  ],
  templateUrl: './keys-dashboard.component.html',
  styleUrl: './keys-dashboard.component.css',
  standalone: true,
})
export class KeysDashboardComponent {

}
