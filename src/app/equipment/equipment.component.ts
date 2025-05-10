import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Department} from "../service/department.service";
import {Employee} from "../service/employee.service";
import {Contract, ContractService} from "../service/contract.service";
import {LocationEquipment, ThisLocation} from "../service/location.service";
import {EquipmentService, ThisEquipment} from "../service/equipment.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-equipment', templateUrl: './equipment.component.html', styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit {
  department!: Department
  employee!: Employee
  contract!: Contract
  title = ""
  thisLocation!: ThisLocation
  equipments: ThisEquipment[] = []
  columns: string[] = ["profile", "serialNumber", "category", "company", "location", "control"]
  pickEquipments: number[] = []
  isDepartment = false
  isContract = false


  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalService,
              private equipmentService: EquipmentService,
              private contractService: ContractService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value: any) => {
      this.thisLocation = value
    })
    this.activatedRoute.data.subscribe((value: any) => {
      if (this.thisLocation.partition == "department") {
        this.department = value.partitionResolver
        if (this.department.title) {
          this.title = this.department.title
          this.isDepartment = true
          this.isContract = false
        } else {
          this.title = "Склад"
          this.isDepartment = false
          this.isContract = false
        }
      }
      if (this.thisLocation.partition == "employee") {
        this.employee = value.partitionResolver
        this.title = this.employee.name
        this.isDepartment = false
        this.isContract = false
      }
      if (this.thisLocation.partition == "contract") {
        this.contract = value.partitionResolver
        this.title = this.contract.number + "(" + this.contract.address + ")"
        this.isContract = true
        this.isDepartment = false
      }
      this.pickEquipments = []
      this.equipments = value.equipmentResolver
    })
  }

  dialogCreateEquipment() {
    this.dialog.open(DialogEquipmentForm, {
      data: {
        thisLocation: this.thisLocation
      }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogUpdateEquipment(id: number) {
    this.equipmentService.getByIds([id]).pipe(first()).subscribe(value => {
      const equipment = {
        id: value[0].id,
        serialNumber: value[0].serial_number,
        profile: value[0].profile
      }
      this.dialog.open(DialogEquipmentForm, {
        data: {
          update: equipment
        }
      }).afterClosed().pipe(first()).subscribe(_ => {
        this.getEquipments()
      });
    })
  }

  dialogDeleteEquipment(id: number) {
    this.dialog.open(DialogEquipmentDelete, {data: this.globalService.delete}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.equipmentService.delete(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Удалено!")
            this.getEquipments()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  dialogEquipmentTransfer() {
    this.dialog.open(DialogEquipmentTransferForm, {
      data: {
        pickEquipments: this.pickEquipments,
        thisLocation: this.thisLocation
      }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogEquipmentReplace() {
    this.dialog.open(DialogEquipmentReplaceForm, {
      data: {
        pickEquipments: this.pickEquipments,
        thisLocation: this.thisLocation
      }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogEquipmentHistory(id: number) {
    this.dialog.open(DialogEquipmentHistoryForm, {
      data: {
        id,
        haveAccess: this.haveAccessToDepartment()
      }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogDepartmentStaff() {
    this.dialog.open(DialogDepartmentStaffForm, {
      data:
        {
          locationId: this.thisLocation,
          haveAccess: this.haveAccessToDepartment()
        }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogEquipmentReport() {
    this.dialog.open(DialogEquipmentReportForm, {
      data:
        {
          locationId: this.thisLocation
        }
    }).afterClosed().pipe(first()).subscribe(_ => {
      this.getEquipments()
    })
  }

  dialogUpdateContract() {
    const id = Number(this.thisLocation.id)
    this.contractService.getById(id).pipe(first()).subscribe((value: Contract) => {
      const contract = {
        id: id,
        number: value.number,
        address: value.address
      }
      this.dialog.open(DialogContractUpdateForm, {data: contract}).afterClosed().pipe(first()).subscribe(_ => {
        this.contractService.getById(id).subscribe(value => {
          this.title = value.number + "(" + value.address + ")"
        })
      })
    })
  }

  dialogDeleteContract() {
    const id = Number(this.thisLocation.id)
    this.dialog.open(DialogContractDelete).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.contractService.delete(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Удалено!")
            this.router.navigate(["home"]).then()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  getEquipments() {
    let locationEquipment: LocationEquipment = {
      to_department: {id: 0},
      to_employee: {id: 0},
      to_contract: {id: 0}
    }
    if (this.thisLocation.partition == "department") {
      locationEquipment.to_department.id = Number(this.thisLocation.id)
    }
    if (this.thisLocation.partition == "employee") {
      locationEquipment.to_employee.id = Number(this.thisLocation.id)
    }
    if (this.thisLocation.partition == "contract") {
      locationEquipment.to_contract.id = Number(this.thisLocation.id)
    }
    this.equipmentService.getByLocation(locationEquipment).pipe(first()).subscribe((value: any) => {
      this.equipments = value
      this.pickEquipments = []
    })
  }

  pick(id: number) {
    if (this.haveAccessToDepartment()) {
      const element = document.getElementById("row" + id)
      if (element) {
        for (let e in this.pickEquipments) {
          if (this.pickEquipments[e] == id) {
            this.pickEquipments.splice(Number(e), 1)
            element.classList.remove("select")
            return
          }
        }
        this.pickEquipments.push(id)
        element.classList.add("select")
      }
    }
  }

  haveAccessToDepartment() {
    return this.globalService.employee.role == "ADMIN" ||
      (this.globalService.employee.role == "CONTROL" &&
        (this.thisLocation.id == this.globalService.employee.department.id || this.thisLocation.id == 0))
  }

  haveAccessControl() {
    return this.globalService.employee.role == "ADMIN" || this.globalService.employee.role == "CONTROL"
  }
}

@Component({
  selector: 'dialog-equipment-history-form', templateUrl: './dialog-equipment-history-form.html'
})
export class DialogEquipmentHistoryForm {
}

@Component({
  selector: 'dialog-equipment-transfer-form', templateUrl: './dialog-equipment-transfer-form.html'
})
export class DialogEquipmentTransferForm {
}

@Component({
  selector: 'dialog-equipment-replace-form', templateUrl: './dialog-equipment-replace-form.html'
})
export class DialogEquipmentReplaceForm {
}

@Component({
  selector: 'dialog-equipment-form', templateUrl: './dialog-equipment-form.html'
})
export class DialogEquipmentForm {
}

@Component({
  selector: 'dialog-equipment-delete', templateUrl: './dialog-equipment-delete.html'
})
export class DialogEquipmentDelete {
}

@Component({
  selector: 'dialog-department-staff-form', templateUrl: './dialog-department-staff-form.html'
})
export class DialogDepartmentStaffForm {
}

@Component({
  selector: 'dialog-equipment-report-form', templateUrl: './dialog-equipment-report-form.html'
})
export class DialogEquipmentReportForm {
}

@Component({
  selector: 'dialog-contract-update-form', templateUrl: './dialog-contract-update-form.html'
})
export class DialogContractUpdateForm {
}

@Component({
  selector: 'dialog-contract-delete', templateUrl: './dialog-contract-delete.html'
})
export class DialogContractDelete {
}
