import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContentComponent } from './components/add-content/add-content.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditContentComponent } from './components/edit-content/edit-content.component';
import { ListContentComponent } from './components/list-content/list-content.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list-content', pathMatch: 'full' },
  { path:'',component:ListContentComponent,canActivate: [AuthGuard]},
  { path:'add-content',component:AddContentComponent,canActivate: [AuthGuard]},
  { path:'edit-content/:id',component:EditContentComponent,canActivate: [AuthGuard]},
  {path:'add-event',component:AddEventComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
