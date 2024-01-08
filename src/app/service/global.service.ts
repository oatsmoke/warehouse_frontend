import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {Contract} from "./contract.service";
import {Employee} from "./employee.service";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    API_URL = "http://localhost:8081"
    employee!: Employee

    constructor(private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    msg(str: string) {
        this.snackBar.open(str, "", {duration: 3000})
    }

    searchContract(input: FormControl, contracts: Contract[]): number {
        let contractId = 0
        for (let contract of contracts) {
            if (contract.number == input.value) {
                contractId = contract.id
                break
            } else {
                contractId = 0
            }
        }
        if (contractId == 0) {
            input.setErrors({message: "Номер договора не найден!"})
            return 0
        } else {
            return contractId
        }
    }

    inputValidator(input: FormControl) {
        if (input.hasError("required")) {
            return "Необходимо заполнить!"
        }
        if (input.hasError("pattern")) {
            return "Недопустимые символы!"
        }
        if (input.hasError("maxlength")) {
            return "Недопустимая длина!"
        }
        if (input.hasError("email")) {
            return "Неверный формат почты!"
        }
        if (input.errors) {
            return input.errors["message"]
        }
        return "Неизвестная ошибка!"
    }

    close() {
        this.dialog.closeAll()
    }
}
