import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../sevices/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  todoForm !: FormGroup;
  actionBtn: string = 'Add Task'
  constructor(private formBuilder: FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editRow: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      Name : ['', Validators.required],
      Task : ['', Validators.required]
    })
    if(this.editRow){
      this.actionBtn = 'Update'
      this.todoForm.controls['Name'].setValue(this.editRow.Name);
      this.todoForm.controls['Task'].setValue(this.editRow.Task);
    }
    
  }
  addTask(){
    if(!this.editRow){
      if (this.todoForm.valid){
        this.api.postData(this.todoForm.value).subscribe({
          next:()=>{
            alert("Data Added Successfully")
            this.todoForm.reset();
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("Error occured")
          }
        })
      }
    }else{
      this.updateData()
    }
  }
  updateData(){
    this.api.putData(this.todoForm.value, this.editRow._id).subscribe({
      next:(res)=>{
        alert("Task Updated Successfully");
        this.todoForm.reset();
        this.dialogRef.close("update")
      },
      error:(err)=>{
        alert("Error in updating "+ err)
      }
    })
  }
  
}
