import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
  diarySubject = new Subject<DiaryEntry[]>();

  diaryEntries: DiaryEntry[] = [
    new DiaryEntry('Jan 1st', 'Entry 1'),
    new DiaryEntry('Jan 2nd', 'Hello Worlds'),
    new DiaryEntry('Jan 3rd', 'Hello Mars'),
  ];

  onDelete(index: number) {
    this.diaryEntries.splice(index, 1);
    this.diarySubject.next(this.diaryEntries);
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.diaryEntries.push(diaryEntry);
    this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntry(index: number) {
    return { ...this.diaryEntries[index] };
  }

  onUpdateEntry(paramId: number, newEntry: DiaryEntry) {
    this.diaryEntries[paramId] = newEntry;
    this.diarySubject.next(this.diaryEntries);
  }
}
