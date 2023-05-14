import {Component, Input, OnInit} from '@angular/core';
import {ThisEquipment} from "../service/equipment.service";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    @Input() location!: ThisEquipment
    code = ""

    constructor() {
    }

    ngOnInit(): void {
        this.code = this.location.code
        if (this.location.code.indexOf("TRANSFER") != -1) {
            this.code = this.location.code.replace("TRANSFER_", "")
        }
        if (this.location.code.indexOf("REPLACE") != -1) {
            this.code = this.location.code.replace("REPLACE_", "")
        }
    }

    transferTypeConvert(value: string): string {
        switch (value) {
            case 'rent':
                return "Аренда"
            case 'responsible':
                return "Ответственное хранение"
            case 'buy':
                return "Продажа"
            case 'installment':
                return "Рассрочка"
            default:
                return value
        }
    }
}
