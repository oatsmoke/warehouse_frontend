import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export interface ShowError {
    status: string
    message: string
}

@Component({
    selector: 'app-api-server-error',
    templateUrl: './api-server-error.component.html',
    styleUrls: ['./api-server-error.component.css']
})
export class ApiServerErrorComponent implements OnInit {
    showError: ShowError

    constructor(private activatedRoute: ActivatedRoute) {
        this.showError = {status: "", message: ""}
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: any) => {
                this.showError.status = params["status"]
                this.showError.message = params["message"]
            }
        );
    }
}
