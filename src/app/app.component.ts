import { identifierName, ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './sevices/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TODOnew';
  isDarkTheme = false
  displayedColumns: string[] = ['Name', 'Task', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
     private api : ApiService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllData();
      }
    })
  }
  getAllData(){
    this.api.getData().subscribe({
      next:(res)=>{
        console.log("responce",res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching data")
      }
    })
  }
  editData(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllData();
      }
    })
  }

  deleteTask(id:any){
    this.api.deleteData(id).subscribe({
      next:(res)=>{
        console.log("res",res)
        alert("Task Deleted successfully");
        this.getAllData();
      },
      error:(err)=>{
        console.log("error",err)
        alert("Error while deleting the Task..."+ err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  darkEnable(){
    this.isDarkTheme = !this.isDarkTheme
    // console.log(this.isDarkTheme);
  }
}
