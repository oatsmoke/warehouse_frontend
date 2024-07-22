import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Department, DepartmentService} from "../service/department.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {
  departments: Department[] = []
  columns: string[] = ["title", "deleted", "control"]

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(first()).subscribe((value: any) => {
      this.departments = value.departmentResolver
    })
  }

  dialogCreateDepartment() {
    this.dialog.open(DialogDepartmentForm).afterClosed().pipe(first()).subscribe(_ => {
      this.getDepartments()
    })
  }

  getDepartments() {
    this.departmentService.getAll(true).pipe(first()).subscribe((value: any) => {
      this.departments = value
    })
  }

  updateDepartment(id: number) {
    this.departmentService.getById(id).pipe(first()).subscribe((value: Department) => {
      const department = {
        id: id,
        title: value.title
      }
      this.dialog.open(DialogDepartmentForm, {data: department}).afterClosed().pipe(first()).subscribe(_ => {
        this.getDepartments()
      });
    })
  }

  deleteDepartment(id: number) {
    this.dialog.open(DialogDepartmentDeleteRestore, {data: this.globalService.delete}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.departmentService.delete(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Удалено!")
            this.getDepartments()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  restoreDepartment(id: number) {
    this.dialog.open(DialogDepartmentDeleteRestore, {data: this.globalService.restore}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.departmentService.restore(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Восстановлено!")
            this.getDepartments()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }
}

@Component({
  selector: 'dialog-department-form', templateUrl: './dialog-department-form.html'
})
export class DialogDepartmentForm {
}

@Component({
  selector: 'dialog-department-delete-restore', templateUrl: './dialog-department-delete-restore.html'
})
export class DialogDepartmentDeleteRestore {
}
