import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Contract, ContractService} from "../service/contract.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-contract-input-form',
    templateUrl: './contract-input-form.component.html',
    styleUrls: ['./contract-input-form.component.css']
})
export class ContractInputFormComponent implements OnInit {
    contracts: Contract[] = []
    filteredContracts!: Observable<Contract[]>
    searchContractForm: FormGroup
    number = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(10)
    ])

    constructor(private formBuilder: FormBuilder,
                private contractService: ContractService,
                private router: Router,
                private globalService: GlobalService) {
        this.searchContractForm = this.formBuilder.group({
            number: this.number
        })
    }

    ngOnInit(): void {
        this.contractService.getAll().subscribe(value => {
            this.contracts = value
        })
        this.filteredContracts = this.number.valueChanges.pipe(
            map(value => this.filter(value))
        )
    }

    filter(value: string): Contract[] {
        return this.contracts.filter(option => option.number.includes(value))
    }

    searchContract() {
        this.globalService.searchContract(this.number, this.contracts)
    }

    ok() {
        for (let contract of this.contracts) {
            if (contract.number == this.number.value) {
                this.router.navigate(['contract', contract.id]).then()
                this.close()
                break
            }
        }
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
