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
  diaryEntriesSub = new Subscription();

  constructor(
    private diaryDataServices: DiaryDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.diaryDataServices.getDiaryEntries();
    this.diaryEntriesSub = this.diaryDataServices.diarySubject.subscribe(
      (entries) => {
        this.diaryEntries = entries;
      }
    );
  }

  ngOnDestroy(): void {
    this.diaryEntriesSub.unsubscribe();
  }

  onDelete(id: string) {
    this.diaryDataServices.onDeleteEntry(id);
  }

  onEdit(id: string) {
    this.router.navigate(['edit', id]);
  }
}
