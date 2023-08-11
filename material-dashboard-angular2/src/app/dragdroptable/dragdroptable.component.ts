import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Fundo } from './fundo.model';
import { MatTable } from '@angular/material/table';
import { ListaCalculo } from './listacalculo.model';

@Component({
  selector: 'app-dragdroptable',
  templateUrl: './dragdroptable.component.html',
  styleUrls: ['./dragdroptable.component.scss']
})
export class DragDropTableComponent {

  listaCalculo: Array<ListaCalculo> = [
    {
      data_base: '12/01/2023',
      fundos: [{
        name: 'INTSAMBA',
        position: 0,
        selecionado: false,
        data_base: ''
      }, {
        name: 'KINEA',
        position: 1,
        selecionado: false,
        data_base: ''
      }]
    },
    {
      data_base: '10/01/2023',
      fundos: [{
        name: 'FAC 001',
        position: 4,
        selecionado: false,
        data_base: ''
      }, {
        name: 'FOF',
        position: 5,
        selecionado: false,
        data_base: ''
      }]
    }
  ]
  @ViewChild('table', { static: true }) table: MatTable<Fundo>;

  displayedColumns: string[] = ['selecionado', 'position', 'name'];
  fundos: Array<Fundo> = [{
    name: 'INTSAMBA',
    position: 0,
    selecionado: false,
    data_base: ''
  }, {
    name: 'KINEA',
    position: 1,
    selecionado: false,
    data_base: ''
  }, {
    name: 'INTMORGAN',
    position: 2,
    selecionado: false,
    data_base: ''
  }, {
    name: '173-ITAÚ INDEX',
    position: 3,
    selecionado: false,
    data_base: ''
  }, {
    name: 'FAC 001',
    position: 4,
    selecionado: false,
    data_base: ''
  }, {
    name: 'FOF',
    position: 5,
    selecionado: false,
    data_base: ''
  }
  ];

  dragDisabled = true;

  drop(event: CdkDragDrop<Fundo[]>) {
    // Return the drag container to disabled.
    this.dragDisabled = true;
    if (event.currentIndex < this.countFundosSelecionados()) {
      this.atualizarPosicao(event.item.data, event.currentIndex);
    }
  }

  countFundosSelecionados() {
    return this.fundos.filter(x => x.selecionado).length;
  }

  inserir() {
    console.log(this.fundos)
  }

  changeSelect(fundo) {
    console.log(fundo)
    fundo.selecionado = !fundo.selecionado;
    this.atualizarPosicao(fundo, this.countFundosSelecionados() - 1);
  }

  atualizarPosicao(fundo, currentIndex) {
    const previousIndex = this.fundos.findIndex((d) => d === fundo);
    moveItemInArray(this.fundos, previousIndex, currentIndex);
    this.table.renderRows();
    this.updateFieldPositionFundo();
  }

  updateFieldPositionFundo() {
    this.fundos.forEach((x, i) => {
      x.position = i
    });
  }
}
