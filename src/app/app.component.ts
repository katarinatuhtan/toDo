import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  taskObj: Task = new Task();
  taskList: Task[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("todo");
    if (localData != null) {
      this.taskList = JSON.parse(localData)
    }
  }

  openModel() {

    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.taskObj = new Task();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Task) {
    const isDelete = confirm("Are you sure you want to delete this task?")
    if (isDelete) {
      const currentRecord = this.taskList.findIndex(m => m.id === this.taskObj.id);
      this.taskList.splice(currentRecord, 1);
      localStorage.setItem("todo", JSON.stringify(this.taskList));
    }
  }

  onUpdate(item: Task) {
    this.taskObj = item;
    this.openModel();
  }


  updateTask() {
    const currentRecord = this.taskList.find(m => m.id === this.taskObj.id)
    if (currentRecord != undefined) {
      currentRecord.name = this.taskObj.name;
      currentRecord.description = this.taskObj.description;
      currentRecord.completed = this.taskObj.completed;
    };
    localStorage.setItem("todo", JSON.stringify(this.taskList));
    this.closeModel();
  }
  saveTask() {
    debugger;
    const isLocalPresent = localStorage.getItem("todo");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.taskObj.id = oldArray.length + 1;
      oldArray.push(this.taskObj);
      this.taskList = oldArray;
      localStorage.setItem("todo", JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.taskObj);
      this.taskObj.id = 1;
      this.taskList = newArr;
      localStorage.setItem("todo", JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

export class Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.completed = false;
  }
}