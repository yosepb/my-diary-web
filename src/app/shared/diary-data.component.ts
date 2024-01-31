import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
  public maxId: number;
  public diarySubject = new Subject<DiaryEntry[]>();
  private diaryEntries: DiaryEntry[] = [];
  constructor(private http: HttpClient) {}

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
    const index = this.diaryEntries.findIndex((el) => {
      return el.id == id;
    });
    return this.diaryEntries[index];
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.http
      .get<{ maxId: number }>('http://localhost:3000/max-id')
      .subscribe((jsonData) => {
        diaryEntry.id = jsonData.maxId + 1;
        this.http
          .post<{ message: string }>(
            'http://localhost:3000/add-entry',
            diaryEntry
          )
          .subscribe((jsonData) => {
            console.log(diaryEntry);
            this.getDiaryEntries();
          });
      });
  }

  onUpdateEntry(id: number, entry: DiaryEntry) {
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/update-entry/' + id,
        entry
      )
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
      });
  }

  onDeleteEntry(id: number) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/remove-entry/' + id)
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
      });
  }
}
