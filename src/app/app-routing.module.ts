import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component'; // ini akan otomatis tertambah
import { DiaryFormComponent } from './diary-form/diary-form.component';

// konfigurasi routing disini
const routes: Routes = [
  {path:"", component: DiaryComponent},
  {path:"data-entry", component: DiaryFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
