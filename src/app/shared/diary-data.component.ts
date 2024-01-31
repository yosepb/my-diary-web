import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
  constructor(private http: HttpClient) {}

  public diarySubject = new Subject<DiaryEntry[]>();
  private diaryEntries: DiaryEntry[] = [];

  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.diaryEntries.push(diaryEntry);
    this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntries() {
    this.http
      .get<{ diaryEntries: DiaryEntry[] }>(
        'http://localhost:3000/diary-entries'
      )
      .subscribe((jsonData) => {
        this.diaryEntries = jsonData.diaryEntries;
        this.diarySubject.next(this.diaryEntries);
      });
  }

  getDiaryEntry(id: number) {
    return { ...this.diaryEntries[id] };
  }

  onUpdateEntry(id: number, entry: DiaryEntry) {
    this.diaryEntries[id] = entry;
    this.diarySubject.next(this.diaryEntries);
  }

  onDeleteEntry(id: number) {
    this.diaryEntries.splice(id, 1);
    this.diarySubject.next(this.diaryEntries);
  }
}
