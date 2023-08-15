import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Fundo } from './fundo.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ListaCalculo } from './listacalculo.model';
import { MatPaginator } from '@angular/material/paginator';
import { FundosMock } from "./items";


@Component({
  selector: 'app-dragdroptable',
  templateUrl: './dragdroptable.component.html',
  styleUrls: ['./dragdroptable.component.scss']
})
export class DragDropTableComponent implements AfterViewInit {

  listaCalculo: Array<Fundo> = [
    {
      data_base: '12/01/2023',
      name: 'INTSAMBA',
      position: 0,
      selecionado: false,
    },
    {
      data_base: '12/01/2023',
      name: 'FAC 001',
      position: 1,
      selecionado: false,
    },
    {
      data_base: '12/01/2023',
      name: 'KINEA',
      position: 2,
      selecionado: false,
    }
  ]

  dragDisabled = true;
  dataSource: MatTableDataSource<Fundo>;
  dataSourceCalculos: MatTableDataSource<Fundo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table', { static: true }) table: MatTable<Fundo>;
  displayedColumns: string[] = ['selecionado', 'position', 'name', 'date', 'duplicate_row'];
  fundos: Array<Fundo> = FundosMock;

  constructor() {
    this.updateFieldPositionFundo();
    this.dataSource = new MatTableDataSource(this.fundos);
    this.dataSourceCalculos = new MatTableDataSource(this.listaCalculo);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<Fundo[]>) {
    // Return the drag container to disabled.
    this.dragDisabled = true;
    if (event.currentIndex < this.countFundosSelecionados()) {
      this.atualizarPosicao(event.item.data, event.currentIndex);
    }
  }

  changeData(event) {
    console.log(event)
  }

  countFundosSelecionados() {
    return this.fundos.filter(x => x.selecionado).length;
  }

  duplicarRow(fundo: Fundo) {
    const fundoDuplicado = Object.assign({}, fundo);
    fundoDuplicado.data_base = ''
    this.dataSource.data.splice(fundo.position + 1, 0, fundoDuplicado);
    this.updateFieldPositionFundo();
    this.dataSource._updateChangeSubscription()
  }

  adicionar() {
    console.log(this.fundos)
  }

  calcular() {
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
    this.updateFieldPositionFundo();
    this.table.renderRows();
  }

  updateFieldPositionFundo() {
    this.fundos.forEach((x, i) => {
      x.position = i
    });
  }
}
