import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICategory} from "../../interfaces/category";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {take} from "rxjs/operators";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {Router} from "@angular/router";
import {ITag} from "../../interfaces/tag";
import {DiaryTagService} from "../../shared/services/diary-tag.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: ICategory[] = [];
  tags: ITag[] = [];
  moodList: string[] = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  searchCategories: string[] = [];

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService,
    private readonly diaryTagService: DiaryTagService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.diaryCategoryService.getAll().pipe(take(1)).subscribe(res => {
      if (!res) {
        return;
      }

      this.categories = res;
      this.cdr.detectChanges();
    });

    this.diaryTagService.getAll().pipe(take(1)).subscribe(res => {
      if (!res) {
        return;
      }

      this.tags = res;
      this.cdr.detectChanges();
    });
  }

  clickCategory(name: string) {
    if (this.searchCategories.indexOf(name) > -1) {
      this.searchCategories = this.searchCategories.filter(i => i !== name);
    } else {
      this.searchCategories.push(name);
    }

    if (this.searchCategories.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate(
      ['/search'],
      {queryParams: {category: this.searchCategories.join(',')}}
      );
  }

  clickTag(name: string) {

  }

  clickMood(item: string) {

  }
}
