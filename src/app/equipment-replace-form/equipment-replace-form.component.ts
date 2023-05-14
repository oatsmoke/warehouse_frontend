import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentService, ThisEquipment} from "../service/equipment.service";
import {Department, DepartmentService} from "../service/department.service";
import {EmployeeService} from "../service/employee.service";
import {ContractService} from "../service/contract.service";
import {LocationEquipment, LocationService, RequestLocation} from "../service/location.service";
import {GlobalService} from "../service/global.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first, map, Observable} from "rxjs";

@Component({
    selector: 'app-equipment-replace-form',
    templateUrl: './equipment-replace-form.component.html',
    styleUrls: ['./equipment-replace-form.component.css']
})
export class EquipmentReplaceFormComponent implements OnInit {
    equipmentFromContract!: ThisEquipment
    equipmentToContract!: ThisEquipment
    departments: Department[] = []
    equipments: ThisEquipment[] = []
    filteredEquipments!: Observable<ThisEquipment[]>
    replaceForm: FormGroup
    date = new FormControl(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()),
        Validators.required)
    department = new FormControl("", Validators.required)
    serialNumber = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9a-zA-Z]+"),
        Validators.maxLength(20)
    ])

    constructor(private formBuilder: FormBuilder,
                private equipmentService: EquipmentService,
                private departmentService: DepartmentService,
                private employeeService: EmployeeService,
                private contractService: ContractService,
                private locationService: LocationService,
                private globalService: GlobalService,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.replaceForm = this.formBuilder.group({
            date: this.date,
            department: this.department,
            serialNumber: this.serialNumber
        })
    }

    ngOnInit(): void {
        this.getEquipmentsById()
        this.getDepartments()
        this.serialNumber.disable()
    }

    getEquipmentsById() {
        this.equipmentService.getByIds(this.data.pickEquipments).pipe(first()).subscribe(value => {
            this.equipmentFromContract = value[0]

        })
    }

    getDepartments() {
        this.departmentService.getAll().pipe(first()).subscribe((value: any) => {
            this.departments = value
        })
    }

    fromDepartment() {
        this.getEquipmentsByDepartment(this.department.value)
        this.serialNumber.reset()
    }

    getEquipmentsByDepartment(id: number) {
        let locationEquipment: LocationEquipment = {
            toDepartment: {id: id},
            toEmployee: {id: 0},
            toContract: {id: 0}
        }
        this.equipmentService.getByLocation(locationEquipment).pipe(first()).subscribe((value: any) => {
            if (value == null) {
                this.serialNumber.disable()
            } else {
                this.equipments = value
                this.serialNumber.enable()
            }
        })
        this.filteredEquipments = this.serialNumber.valueChanges.pipe(
            map(value => this.filter(value))
        )
    }

    filter(value: string): ThisEquipment[] {
        return this.equipments.filter(option => option.equipment.serialNumber.toLowerCase().includes(value))
    }

    searchEquipment() {
        let found = false
        for (let equipment of this.equipments) {
            if (equipment.equipment.serialNumber == this.serialNumber.value) {
                this.equipmentToContract = equipment
                found = true
                break
            } else {
                found = false
            }
        }
        if (!found) {
            this.serialNumber.setErrors({message: "Серийный номер не найден!"})
        }
    }

    ok() {
        const value = this.replaceForm.value
        let requestLocation: RequestLocation[] = []
        let requestFromContract: RequestLocation
        let requestToContract: RequestLocation
        requestFromContract = {
            date: new Date(value.date).getTime() / 1000,
            equipmentId: this.equipmentFromContract.equipment.id,
            way: "replace",
            thisLocation: this.data.thisLocation.partition,
            where: "department",
            inDepartment: false,
            company: this.equipmentFromContract.company.id,
            toDepartment: this.equipmentToContract.toDepartment.id,
            toEmployee: this.equipmentToContract.toEmployee.id,
            toContract: 0,
            transferType: "",
            price: ""
        }
        requestToContract = {
            date: new Date(value.date).getTime() / 1000,
            equipmentId: this.equipmentToContract.equipment.id,
            way: "replace",
            thisLocation: "department",
            where: this.data.thisLocation.partition,
            inDepartment: false,
            company: this.equipmentToContract.company.id,
            toDepartment: 0,
            toEmployee: 0,
            toContract: Number(this.data.thisLocation.id),
            transferType: this.equipmentFromContract.transferType,
            price: this.equipmentFromContract.price
        }
        requestLocation.push(requestFromContract, requestToContract)
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
