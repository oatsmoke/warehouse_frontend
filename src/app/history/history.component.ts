import {Component, Input, OnInit} from '@angular/core';
import {ThisEquipment} from "../service/equipment.service";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    @Input() location!: ThisEquipment

    constructor() {
    }

    ngOnInit(): void {

    }
}
