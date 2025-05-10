import {Component, OnInit} from '@angular/core';
import {EquipmentService, ThisEquipment} from "../service/equipment.service";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GlobalService} from "../service/global.service";
import {LocationService} from "../service/location.service";

@Component({
  selector: 'app-equipment-info',
  templateUrl: './equipment-info.component.html',
  styleUrls: ['./equipment-info.component.css']
})
export class EquipmentInfoComponent implements OnInit {
  equipment!: ThisEquipment

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalService,
              private equipmentService: EquipmentService,
              private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(first()).subscribe((value: any) => {
      this.equipment = value.equipmentInfoResolver
    })
  }

  getEquipment() {
    this.locationService.getById(this.equipment.equipment.id).pipe(first()).subscribe(value => {
      this.equipment = value
    })
  }

  dialogRestoreEquipment(id: number) {
    this.dialog.open(DialogEquipmentRestore, {data: this.globalService.restore}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.equipmentService.restore(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Восстановлено!")
            this.getEquipment()
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
  selector: 'dialog-equipment-restore', templateUrl: './dialog-equipment-restore.html'
})
export class DialogEquipmentRestore {
}
