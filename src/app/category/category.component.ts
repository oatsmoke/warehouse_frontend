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
    columns: string[] = ["title", "control"];

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

    dialogCreateCategory() {
        this.dialog.open(DialogCategoryForm).afterClosed().pipe(first()).subscribe(_ => {
            this.getCategories()
        })
    }

    getCategories() {
        this.categoryService.getAll().pipe(first()).subscribe((value: any) => {
            this.categories = value
        })
    }

    updateCategory(id: number) {
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

    deleteCategory(id: number) {
        this.dialog.open(DialogCategoryDelete).afterClosed().pipe(first()).subscribe(value => {
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
}

@Component({
    selector: 'dialog-category-form', templateUrl: './dialog-category-form.html'
})
export class DialogCategoryForm {
}

@Component({
    selector: 'dialog-category-delete', templateUrl: './dialog-category-delete.html'
})
export class DialogCategoryDelete {
}