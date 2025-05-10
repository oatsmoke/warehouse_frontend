import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GlobalService} from "../service/global.service";
import {Equipment, EquipmentService} from "../service/equipment.service";
import {first} from "rxjs";

@Component({
  selector: 'app-equipment-search-form',
  templateUrl: './equipment-search-form.component.html',
  styleUrls: ['./equipment-search-form.component.css']
})
export class EquipmentSearchFormComponent implements OnInit {
  equipments: Equipment[] = []
  equipmentSearchForm: FormGroup
  number = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9a-zA-Z]+"),
    Validators.maxLength(20)
  ])

  constructor(private formBuilder: FormBuilder,
              private equipmentService: EquipmentService,
              private router: Router,
              private globalService: GlobalService) {
    this.equipmentSearchForm = this.formBuilder.group({
      number: this.number
    })
  }

  ngOnInit(): void {
  }

  equipmentSearch() {
    if (this.equipmentSearchForm.value.number.length > 0) {
      this.equipmentService.findBySerialNumber(this.equipmentSearchForm.value.number).pipe(first()).subscribe((value: any) => {
        this.equipments = value
      });
    }
  }

  selectEquipment(id: number) {
    console.log(id)
    this.router.navigate(['equipment', id]).then()
    this.close()
  }

  inputErrorMessage(input: FormControl) {
    return this.globalService.inputValidator(input)
  }

  close() {
    this.globalService.close()
  }
}
