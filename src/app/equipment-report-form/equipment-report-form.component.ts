import {Component, Inject, OnInit} from '@angular/core';
import {GlobalService} from "../service/global.service";
import {Category} from "../service/category.service";
import {first} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EquipmentService, ThisEquipment} from "../service/equipment.service";
import {Department} from "../service/department.service";
import {FormControl, Validators} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";

export interface Report {
  categories: Category[]
  departments: Department[]
  leftover: ThisEquipment[][]
  total: ThisEquipment[][]
  fromStorage: ThisEquipment[][]
  toStorage: ThisEquipment[][]
  fromDepartment: ThisEquipment[][][]
  toDepartment: ThisEquipment[][][]
  fromContract: ThisEquipment[][]
  toContract: ThisEquipment[][]
}

@Component({
  selector: 'app-equipment-report-form',
  templateUrl: './equipment-report-form.component.html',
  styleUrls: ['./equipment-report-form.component.css'],

})

export class EquipmentReportFormComponent implements OnInit {
  report!: Report
  date = new FormControl(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth()),
    Validators.required)

  constructor(private globalService: GlobalService,
              private equipmentService: EquipmentService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.getReport()
  }

  getReport() {
    this.equipmentService.reportByCategory(Number(this.data.locationId.id), this.date.value).pipe(first()).subscribe((value: any) => {
      this.report = value
    })
  }

  setMonthAndYear(event: Date, datepicker: MatDatepicker<any>) {
    this.date.setValue(new Date(event.getFullYear(), event.getMonth()))
    this.getReport()
    datepicker.close()
  }

  inputErrorMessage(input: FormControl) {
    return this.globalService.inputValidator(input)
  }

  close() {
    this.globalService.close()
  }
}
