import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {Category, CategoryService} from "../service/category.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = []
  columns: string[] = ["title", "deleted", "control"]

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(first()).subscribe((value: any) => {
      this.categories = value.categoryResolver
    })
  }

  getCategories() {
    this.categoryService.getAll(true).pipe(first()).subscribe((value: any) => {
      this.categories = value
    })
  }

  dialogCreateCategory() {
    this.dialog.open(DialogCategoryForm).afterClosed().pipe(first()).subscribe(_ => {
      this.getCategories()
    })
  }

  dialogUpdateCategory(id: number) {
    this.categoryService.getById(id).pipe(first()).subscribe((value: Category) => {
      const category = {
        id: id,
        title: value.title
      }
      this.dialog.open(DialogCategoryForm, {data: category}).afterClosed().pipe(first()).subscribe(_ => {
        this.getCategories()
      });
    })
  }

  dialogDeleteCategory(id: number) {
    this.dialog.open(DialogCategoryDeleteRestore, {data: this.globalService.delete}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.categoryService.delete(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Удалено!")
            this.getCategories()
          },
          error: error => {
            this.globalService.msg(error.error.message)
          }
        })
      }
    })
  }

  dialogRestoreCategory(id: number) {
    this.dialog.open(DialogCategoryDeleteRestore, {data: this.globalService.restore}).afterClosed().pipe(first()).subscribe(value => {
      if (value) {
        this.categoryService.restore(id).pipe(first()).subscribe({
          next: _ => {
            this.globalService.msg("Восстановлено!")
            this.getCategories()
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
  selector: 'dialog-category-form', templateUrl: './dialog-category-form.html'
})
export class DialogCategoryForm {
}

@Component({
  selector: 'dialog-category-delete-restore', templateUrl: './dialog-category-delete-restore.html'
})
export class DialogCategoryDeleteRestore {
}
