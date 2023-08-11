import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragdropmaterial',
  templateUrl: './dragdropmaterial.component.html',
  styleUrls: ['./dragdropmaterial.component.css']
})
export class DragDropMaterialComponent implements OnInit {

  fundos = [{
      name: 'INTSAMBA',
      position: 0,
      selecionado: false
    }, {
      name: 'KINEA',
      position: 1,
      selecionado: false
    }, {
      name: 'INTMORGAN',
      position: 2,
      selecionado: false
    }, {
      name: '173-ITAÚ INDEX',
      position: 3,
      selecionado: false
    }, {
      name: 'FAC 001',
      position: 4,
      selecionado: false
    }, {
      name: 'FOF',
      position: 5,
      selecionado: false
    }
  ];

  constructor() { }

  ngOnInit() {}

  countFundosSelecionados() {
    return this.fundos.filter(x => x.selecionado).length;
  }

  calcular(){
    console.log(this.fundos)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex < this.countFundosSelecionados())
      this.atualizarPosicao(event.previousIndex, event.currentIndex);
  }

  podeMover(event: CdkDragDrop<string[]>) {
    return event.currentIndex < this.countFundosSelecionados();
  }

  atualizarPosicao(previousIndex, currentIndex) {
    this.fundos.forEach( x => {
      if (x.position == previousIndex) {
        x.position = currentIndex
      } else if(x.position == currentIndex)  {
        x.position = previousIndex
      }
    })
    moveItemInArray(this.fundos, previousIndex, currentIndex)
  }

  changeSelect(fundo) {
    fundo.selecionado = true;
    this.atualizarPosicao(fundo.position, this.countFundosSelecionados() - 1);
  }

}
