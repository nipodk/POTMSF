import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgForOf, NgIf } from '@angular/common';
import { TableState } from '../dashboard/dashboard.component';
import { BalanceService } from '../../../services/balance/balance.service';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule, NgForOf, NgIf, MatRadioGroup, MatRadioButton],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  standalone: true
})

export class DataTableComponent implements OnInit {
  @Input() numberOfKeys: number = 1;
  @Input() tableStates: TableState[] = [];
  public orderTradeUpdates:{ [key: string]: MatTableDataSource<any> } = {};
  public lastActions: string = "1 action";


  constructor(
    private balanceService: BalanceService) {
  }



  public hideTable(tableName: string):void {
    this.tableStates.forEach(table => {
      if(table.tableName === tableName){
        table.tableShow = !table.tableShow
    }
  })
  }

  public selectLastData(event: any) {
    this.lastActions = event.value;
    console.log(this.lastActions);
  }

  displayedColumns: string[] = ['name', 'client', "side", "orderType", "orderQuantity", "definedOrderPrice", "actualOrderPrice", "positionCommission", "positionPnl", "isMaker", "status"];

  ngOnInit(): void {
    this.balanceService.getOrderTradeUpdates().pipe(throttleTime(1000)).subscribe(data => {
      console.log("data: ")
      console.log(data)
      const key:string = data.key;
      if(!this.orderTradeUpdates[key]) {
        this.orderTradeUpdates[key] = new MatTableDataSource<any>();
      }
      this.orderTradeUpdates[key].data.push(data.orderTradeUpdate);
      const allTableData = this.orderTradeUpdates[key].data;
      if("1 action" === this.lastActions){
        this.orderTradeUpdates[key].data = [allTableData[allTableData.length - 1]];
      }
      else{
        const numberOfActions: number = 5;
        console.log(allTableData.length);
        if(allTableData.length >= numberOfActions){
          const startIndex = allTableData.length - numberOfActions;
          this.orderTradeUpdates[key].data = allTableData.slice(startIndex, allTableData.length);
        }
      }
      this.orderTradeUpdates[key]._updateChangeSubscription();
      console.log(this.orderTradeUpdates);
    })
  }
}
