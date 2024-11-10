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
        this.locationService.getByIds(this.data.pickEquipments).pipe(first()).subscribe(value => {
            this.equipmentFromContract = value[0]

        })
    }

    getDepartments() {
        this.departmentService.getAll(false).pipe(first()).subscribe((value:Department[]) => {
            this.departments = value
        })
    }

    fromDepartment() {
        this.getEquipmentsByDepartment(this.department.value)
        this.serialNumber.reset()
    }

    getEquipmentsByDepartment(id: number) {
        let locationEquipment: LocationEquipment = {
            to_department: {id: id},
            to_employee: {id: 0},
            to_contract: {id: 0}
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
        return this.equipments.filter(option => option.equipment.serial_number.toLowerCase().includes(value))
    }

    searchEquipment() {
        let found = false
        for (let equipment of this.equipments) {
            if (equipment.equipment.serial_number == this.serialNumber.value) {
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
            date: new Date(value.date).toDateString(),
            equipment_id: this.equipmentFromContract.equipment.id,
            way: "replace",
            this_location: this.data.thisLocation.partition,
            where: "department",
            in_department: false,
            company: this.equipmentFromContract.company.id,
            to_department: this.equipmentToContract.to_department.id,
            to_employee: this.equipmentToContract.to_employee.id,
            to_contract: 0,
            transfer_type: "",
            price: ""
        }
        requestToContract = {
            date: new Date(value.date).toDateString(),
            equipment_id: this.equipmentToContract.equipment.id,
            way: "replace",
            this_location: "department",
            where: this.data.thisLocation.partition,
            in_department: false,
            company: this.equipmentToContract.company.id,
            to_department: 0,
            to_employee: 0,
            to_contract: Number(this.data.thisLocation.id),
            transfer_type: this.equipmentFromContract.transfer_type,
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
