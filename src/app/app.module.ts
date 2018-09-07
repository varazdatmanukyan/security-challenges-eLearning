import { ErrorHandlerInterceptor } from './services/ErrorHandlerInterceptor';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './services/user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClassService } from './services/class/class.service';


import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LatestClassesComponent } from './components/home/latest-classes/latest-classes.component';
import { SingleClassComponent } from './components/single-class/single-class.component';
import { ClassesComponent } from './components/classes/classes.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AlertService } from './services/alert/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { StudentClassesComponent } from './components/student-classes/student-classes.component';
import { InstructorClassesComponent } from './components/instructor-classes/instructor-classes.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonService } from './services/lesson/lesson.service';
import { AddHeadersInterceptor } from './services/AddHeadersInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LatestClassesComponent,
    SingleClassComponent,
    ClassesComponent,
    UserDashboardComponent,
    AlertComponent,
    StudentClassesComponent,
    InstructorClassesComponent,
    AddClassComponent,
    AddLessonComponent,
    LessonsComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    ClassService,
    UserResolver,
    AlertService,
    LessonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
