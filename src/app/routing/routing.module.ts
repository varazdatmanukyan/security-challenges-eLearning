import { LessonsComponent } from '../components/lessons/lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { StudentClassesComponent } from '../components/student-classes/student-classes.component';
import { UserResolver } from '../resolver/user.resolver';
import { ClassesComponent } from '../components/classes/classes.component';
import { SingleClassComponent } from '../components/single-class/single-class.component';
import { HomeComponent } from '../components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from '../components/register/register.component';
import { InstructorClassesComponent } from '../components/instructor-classes/instructor-classes.component';
import { AddClassComponent } from '../components/add-class/add-class.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      authUser: UserResolver
    }
  },
  {
    path: 'classes',
    component: ClassesComponent,
    resolve: {
      authUser: UserResolver
    }
  },
  {
    path: 'class/:id',
    component: SingleClassComponent,
    resolve: {
      authUser: UserResolver
    }
  },
  {
    path: 'student/classes',
    component: StudentClassesComponent,
    resolve: {
      authUser: UserResolver
    }
  },
  {
    path: 'instructor/classes',
    component: InstructorClassesComponent,
    resolve: {
      authUser: UserResolver
    }
  },
  {
    path: 'instructor/classes/new',
    component: AddClassComponent,
  },
  {
    path: 'instructor/classes/:id/lessons/new',
    component: AddLessonComponent
  },
  {
    path: 'classes/:id/lessons',
    component: LessonsComponent
  },
  { path: 'register', component: RegisterComponent},

  {
    path: '**',
    redirectTo: '',
    resolve: {
      authUser: UserResolver
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
