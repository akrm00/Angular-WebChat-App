import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinPageComponent } from './components/join-page/join-page.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
  {path:"",component:JoinPageComponent},
  {path:"chat",component:ChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
