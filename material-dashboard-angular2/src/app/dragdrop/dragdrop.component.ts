import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragDropComponent implements OnInit {

  fundos = [{
      name: 'INTSAMBA',
      position: 0,
      isDisable: false
    }, {
      name: 'KINEA',
      position: 1,
      isDisable: false
    }, {
      name: 'INTMORGAN',
      position: 2,
      isDisable: false
    }, {
      name: '173-ITAÚ INDEX',
      position: 3,
      isDisable: false
    }, {
      name: 'FAC 001',
      position: 4,
      isDisable: false
    }, {
      name: 'FOF',
      position: 5,
      isDisable: false
    }
  ];

  constructor() { }

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>) {
    console.log("Antes: " + event.previousIndex);
    console.log("Depois: " + event.currentIndex);
    moveItemInArray(this.fundos, event.previousIndex, event.currentIndex);
  }

}
