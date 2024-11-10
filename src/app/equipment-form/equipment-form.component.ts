import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first} from "rxjs";
import {Profile, ProfileService} from "../service/profile.service";
import {GlobalService} from "../service/global.service";
import {EquipmentService} from "../service/equipment.service";
import {RequestLocation} from "../service/location.service";
import {Company, CompanyService} from "../service/company.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {
  changed = true
  updateMode = false
  head = "Добавить оборудование"
  equipmentForm: FormGroup
  profiles: Profile[] = []
  companies: Company[] = []
  pattern = /^[a-zA-Z0-9]+$/
  date = new FormControl(
    new Date(),
    Validators.required)
  company = new FormControl("", Validators.required)
  serialNumber = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9a-zA-Z]+"),
    Validators.maxLength(20)
  ])
  profile = new FormControl("", Validators.required)
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  serialNumbers: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private equipmentService: EquipmentService,
              private companyService: CompanyService,
              private globalService: GlobalService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.equipmentForm = this.formBuilder.group({
      id: 0,
      date: this.date,
      company: this.company,
      serialNumber: this.serialNumber,
      profile: this.profile
    })
  }

  ngOnInit(): void {
    this.profileService.getAll(false).pipe(first()).subscribe((value: any) => {
      this.profiles = value
    })
    this.companyService.getAll(false).pipe(first()).subscribe((value: any) => {
      this.companies = value
    })
    if (this.data.update != null) {
      this.changed = false
      this.head = "Изменить оборудование"
      this.updateMode = true
      this.equipmentForm.setValue({
        id: this.data.update.id,
        date: this.date,
        company: this.company,
        serialNumber: this.data.update.serialNumber,
        profile: this.data.update.profile.id
      })
      this.serialNumbers.push(this.data.update.serialNumber)
    }
  }

  ok() {
    if (this.data.update == null) {
      this.create()
    } else {
      this.update()
    }
  }

  create() {
    let toDepartment = 0
    let toEmployee = 0
    let toContract = 0
    if (this.data.thisLocation.partition == "department") {
      toDepartment = Number(this.data.thisLocation.id)
    }
    if (this.data.thisLocation.partition == "employee") {
      toEmployee = Number(this.data.thisLocation.id)
    }
    if (this.data.thisLocation.partition == "contract") {
      toContract = Number(this.data.thisLocation.id)
    }
    const value = this.equipmentForm.value
    let requestLocation: RequestLocation[] = [{
      date: value.date,
      equipment_id: 0,
      way: "transfer",
      this_location: "storage",
      where: this.data.thisLocation.partition,
      in_department: false,
      company: value.company,
      to_department: toDepartment,
      to_employee: toEmployee,
      to_contract: toContract,
      transfer_type: "",
      price: ""
    }]
    let completedRequests = 0;
    const totalRequests = this.serialNumbers.length;
    this.serialNumbers.forEach(serialNumber => {
      this.equipmentService.create(
        value.date, value.company, serialNumber, value.profile, requestLocation
      ).pipe(first()).subscribe({
        next: _ => {
          this.remove(serialNumber)
          completedRequests++
          if (completedRequests == totalRequests) {
            this.globalService.msg("ОК")
            this.close()
          }
        },
        error: error => {
          this.globalService.msg(error.error.message)
        }
      })
    })
  }

  update() {
    const value = this.equipmentForm.value
    this.equipmentService.update(value.id, value.serialNumber, value.profile).pipe(first()).subscribe({
      next: _ => {
        this.globalService.msg("ОК")
        this.close()
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }

  check() {
    if (this.data.update != null) {
      this.changed = !(this.equipmentForm.value.serialNumber == this.data.update.serialNumber &&
        this.equipmentForm.value.profile == this.data.update.profile.id)
    }
  }

  inputErrorMessage(input: FormControl) {
    return this.globalService.inputValidator(input)
  }

  close() {
    this.globalService.close()
  }

  add(event: MatChipInputEvent): void {
    const value = event.value
    if (value && this.pattern.test((value))) {
      this.serialNumbers.push(value)
      event.chipInput!.clear()
    } else {
      this.globalService.msg("Неверный формат")
    }
  }

  remove(serialNumber: string): void {
    const index = this.serialNumbers.indexOf(serialNumber)
    if (index >= 0) {
      this.serialNumbers.splice(index, 1)
    }
  }
}
