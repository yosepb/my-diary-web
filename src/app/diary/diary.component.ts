import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit, OnDestroy {
  diaryEntries: DiaryEntry[];
  diarySubscription = new Subscription();

  constructor(
    private diaryDataServices: DiaryDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.diarySubscription = this.diaryDataServices.diarySubject.subscribe(
      (diaryEntries) => {
        this.diaryEntries = diaryEntries;
      }
    );
    this.diaryEntries = this.diaryDataServices.diaryEntries;
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: number) {
    this.diaryDataServices.onDelete(index);
  }

  onEdit(index: number) {
    this.router.navigate(['edit', index]);
  }
}
