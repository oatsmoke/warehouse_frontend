import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {
  title = this.data

  constructor(@Inject(MAT_DIALOG_DATA) private data: string) {
  }

  ngOnInit(): void {
  }
}
