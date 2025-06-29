import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first, map, Observable} from "rxjs";
import {EquipmentService, ThisEquipment} from "../service/equipment.service";
import {Department, DepartmentService} from "../service/department.service";
import {Employee, EmployeeService} from "../service/employee.service";
import {Contract, ContractService} from "../service/contract.service";
import {LocationService, RequestLocation} from "../service/location.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-equipment-transfer-form',
    templateUrl: './equipment-transfer-form.component.html',
    styleUrls: ['./equipment-transfer-form.component.css']
})
export class EquipmentTransferFormComponent implements OnInit {
    storage!: boolean
    employeesOnly!: boolean
    equipments: ThisEquipment[] = []
    departments: Department[] = []
    employees: Employee[] = []
    contracts: Contract[] = []
    filteredContracts!: Observable<Contract[]>
    contractId = 0
    isContract = false
    employeeSkip: number[] = []
    transferForm: FormGroup
    date = new FormControl(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()),
        Validators.required)
    where = new FormControl("department")
    inDepartment = new FormControl(false)
    toDepartment = new FormControl("", Validators.required)
    toEmployee = new FormControl("", Validators.required)
    toContract = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(10)
    ])
    transferType = new FormControl("", Validators.required)
    price = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(10)
    ])

    constructor(private formBuilder: FormBuilder,
                private equipmentService: EquipmentService,
                private departmentService: DepartmentService,
                private employeeService: EmployeeService,
                private contractService: ContractService,
                private locationService: LocationService,
                private globalService: GlobalService,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.transferForm = this.formBuilder.group({
            date: this.date,
            where: this.where,
            inDepartment: this.inDepartment,
            toDepartment: this.toDepartment,
            toEmployee: this.toEmployee,
            toContract: this.toContract,
            transferType: this.transferType,
            price: this.price
        })
    }

    ngOnInit(): void {
        if (this.data.thisLocation.partition == "contract") {
            this.isContract = true
        }
        this.getEquipmentsById()
    }

    getEquipmentsById() {
        this.locationService.getByIds(this.data.pickEquipments).pipe(first()).subscribe(value => {
            this.equipments = value
            if (this.data.thisLocation.partition == "department") {
                let count = 0
                for (let e of this.equipments) {
                    if (e.to_employee.id) {
                        count++
                        if (!this.employeeSkip.includes(e.to_employee.id)) {
                            this.employeeSkip.push(e.to_employee.id)
                        }
                    }
                }
                this.employeesOnly = this.equipments.length == count
            }
            this.whereTransfer()
        })
    }

    whereTransfer() {
        if (this.where.value == "department") {
            this.toDepartment.enable()
            this.toEmployee.disable()
            this.toContract.disable()
            this.transferType.disable()
            this.price.disable()
            this.inDepartment.setValue(false)
            this.departmentList()
        }
        if (this.where.value == "employee") {
            this.toDepartment.disable()
            this.toEmployee.enable()
            this.toContract.disable()
            this.transferType.disable()
            this.price.disable()
            if (this.data.thisLocation.partition == "employee" || this.data.thisLocation.partition == "contract") {
                this.inDepartment.setValue(false)
                this.inDepartment.disable()
            } else {
                this.inDepartment.setValue(true)
                this.inDepartment.enable()
            }
            this.employeeList()
        }
        if (this.where.value == "contract") {
            this.toDepartment.disable()
            this.toEmployee.disable()
            this.toContract.enable()
            this.transferType.enable()
            this.price.enable()
            this.inDepartment.setValue(false)
            this.contractList()
        }
    }

    departmentList() {
        this.storage = this.data.thisLocation.id != "0"
        if (this.data.thisLocation.partition == "department" && !this.employeesOnly) {
            this.departmentService.getAllButOne(Number(this.data.thisLocation.id)).pipe(first()).subscribe((value:Department[]) => {
                this.departments = value
            })
        } else {
            this.departmentService.getAll(false).pipe(first()).subscribe((value:Department[]) => {
                this.departments = value
            })
        }
    }

    employeeList() {
        if (this.inDepartment.value) {
            this.employeeService.getByDepartment(this.employeeSkip, Number(this.data.thisLocation.id)).pipe(first()).subscribe(value => {
                this.employees = value
            })
        } else if (this.data.thisLocation.partition == "employee") {
            this.employeeService.getAllButOne(Number(this.data.thisLocation.id),false).pipe(first()).subscribe(value => {
                this.employees = value
            })
        } else {
            this.employeeService.getAllShort(false).pipe(first()).subscribe(value => {
                this.employees = value
            })
        }
    }

    contractList() {
        this.contractService.getAll(false).subscribe(value => {
            this.contracts = value
        })
        this.filteredContracts = this.toContract.valueChanges.pipe(
            map(value => this.filter(value))
        )
    }

    filter(value: string): Contract[] {
        return this.contracts.filter(option => option.number.includes(value))
    }

    searchContract() {
        this.contractId = this.globalService.searchContract(this.toContract, this.contracts)
    }

    cancel(id: number) {
        const element = document.getElementById("equipment" + id)
        if (element) {
            for (let e in this.equipments) {
                if (this.equipments[e].equipment.id == id) {
                    this.equipments.splice(Number(e), 1)
                    element.remove()
                    if (this.equipments.length == 0) {
                        this.close()
                    }
                    return
                }
            }
        }
    }

    ok() {
        const value = this.transferForm.value
        let requestLocation: RequestLocation[] = []
        for (let e of this.equipments) {
            let thisLocation: string
            if (this.data.thisLocation.id == 0) {
                thisLocation = "storage"
            } else if (e.to_employee.id && this.data.thisLocation.id == value.toDepartment) {
                thisLocation = "employee"
                value.inDepartment = true
            } else {
                thisLocation = this.data.thisLocation.partition
            }
            let toDepartment: number
            if (value.where == "employee" && value.inDepartment) {
                toDepartment = Number(this.data.thisLocation.id)
            } else {
                toDepartment = value.toDepartment
            }
            let request: RequestLocation = {
                date: value.date,
                equipment_id: e.equipment.id,
                way: "transfer",
                this_location: thisLocation,
                where: value.where,
                in_department: value.inDepartment,
                company: e.company.id,
                to_department: toDepartment,
                to_employee: value.toEmployee,
                to_contract: this.contractId,
                transfer_type: value.transferType,
                price: value.price
            }
            requestLocation.push(request)
        }
        this.locationService.transferTo(requestLocation).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: (error) => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
