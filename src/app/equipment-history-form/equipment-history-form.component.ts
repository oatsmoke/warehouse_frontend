import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first} from "rxjs";
import {Equipment, EquipmentService, ThisEquipment} from "../service/equipment.service";
import {LocationService} from "../service/location.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-equipment-history-form',
    templateUrl: './equipment-history-form.component.html',
    styleUrls: ['./equipment-history-form.component.css']
})
export class EquipmentHistoryFormComponent implements OnInit {
    head = ""
    history: ThisEquipment[] = []
    first: ThisEquipment | undefined
    equipment!: Equipment
    onlyOne = false

    constructor(private equipmentService: EquipmentService,
                private locationService: LocationService,
                private globalService: GlobalService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.equipmentService.getByIds([this.data.id]).pipe(first()).subscribe(value => {
            this.equipment = value[0]
            this.head = this.equipment.profile.title + " | " + this.equipment.serial_number
        })
        this.locationService.getHistory(this.data.id).pipe(first()).subscribe(value => {
            this.history = value
            this.first = this.history.shift()
            if (this.history.length == 0) {
                this.onlyOne = true
            }
        })
    }

    cancel(id: number) {
        this.locationService.delete(id).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    close() {
        this.globalService.close()
    }
}
