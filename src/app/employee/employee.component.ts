import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Employee, EmployeeService} from "../service/employee.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  employees: Employee[] = []
  columns: string[] = ["name", "phone", "email", "role", "registrationDate", "authorizationDate", "deleted", "control"]

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalService,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employees = this.activatedRoute.snapshot.data['employeeResolver']
  }

  getEmployees() {
    this.employeeService.getAllButAuth(true).pipe(first()).subscribe((value: any) => {
      this.employees = value
    })
  }

  dialogCreateEmployee() {
    this.dialog.open(DialogEmployeeForm).afterClosed().pipe(first()).subscribe(_ => {
      this.getEmployees()
    })
  }

  dialogUpdateEmployee(id: number) {
    this.employeeService.getById(id).pipe(first()).subscribe((value: Employee) => {
      const name = value.name.split(" ")
      const employee = {
        id: id,
        surname: name[0],
        name: name[1],
        patronymic: name[2],
        phone: value.phone,
        email: value.email
      }
      this.dialog.open(DialogEmployeeForm, {data: employee}).afterClosed().pipe(first()).subscribe(_ => {
        this.getEmployees()
      });
    })
  }

  dialogDeleteEmployee(id: number) {
    this.dialog.open(DialogEmployeeDeleteRestore, {data: this.globalService.delete}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.employeeService.delete(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Удалено!")
            this.getEmployees()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  dialogRestoreEmployee(id: number) {
    this.dialog.open(DialogEmployeeDeleteRestore, {data: this.globalService.restore}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.employeeService.restore(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Восстановлено!")
            this.getEmployees()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  activateEmployee(id: number) {
    this.employeeService.activate(id).pipe(first()).subscribe({
      next: _ => {
        this.globalService.msg("Активировано!")
        this.getEmployees()
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }

  deactivateEmployee(id: number) {
    this.employeeService.deactivate(id).pipe(first()).subscribe({
      next: _ => {
        this.globalService.msg("Деактивировано!")
        this.getEmployees()
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }

  resetPasswordEmployee(id: number) {
    this.employeeService.resetPassword(id).pipe(first()).subscribe({
      next: _ => {
        this.globalService.msg("Пароль отправлен на почту!")
        this.getEmployees()
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }

  changeRoleEmployee(id: number, role: string) {
    this.employeeService.changeRole(id, role).pipe(first()).subscribe({
      next: _ => {
        this.globalService.msg("Роль изменена!")
        this.getEmployees()
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }
}

@Component({
  selector: 'dialog-employee-form', templateUrl: './dialog-employee-form.html'
})
export class DialogEmployeeForm {
}

@Component({
  selector: 'dialog-employee-delete-restore', templateUrl: './dialog-employee-delete-restore.html'
})
export class DialogEmployeeDeleteRestore {
}
